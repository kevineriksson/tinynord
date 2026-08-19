#!/usr/bin/env python3
"""Upload every product image referenced in data.js to Cloudinary with a
DETERMINISTIC, PATH-BASED public_id, then write a manifest keyed by the exact
URL-encoded path string data.js stores.

Why: the old pipeline keyed Cloudinary assets by *basename*, so different
colour-variant photos that share a filename (e.g. every stroller colour folder
has its own "298917 (1).jpg") collapsed onto a single Cloudinary asset. This
gives each distinct local file its own asset instead.

Usage (reads .env automatically):
    python3 build/upload_all.py            # upload everything
    python3 build/upload_all.py --dry-run  # print planned public_ids, no upload
    python3 build/upload_all.py --only-missing  # skip assets already present

Writes: data/cloudinary-manifest-paths.json  { "<url-encoded-path>": "<public_id>" }
"""

import base64
import hashlib
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parent.parent
DATA_JS = ROOT / "data.js"
OUT_MANIFEST = ROOT / "data" / "cloudinary-manifest-paths.json"


def load_env() -> None:
    env = ROOT / ".env"
    if not env.exists():
        return
    for line in env.read_text(encoding="utf-8").splitlines():
        m = re.match(r"\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$", line)
        if m and m.group(1) not in os.environ:
            os.environ[m.group(1)] = m.group(2).strip().strip("'\"")


load_env()
CLOUD = os.environ.get("CLOUDINARY_CLOUD_NAME", "dqbtlzcft")
KEY = os.environ.get("CLOUDINARY_API_KEY")
SECRET = os.environ.get("CLOUDINARY_API_SECRET")


def distinct_image_paths() -> list[str]:
    """All distinct URL-encoded image paths referenced by data.js `images` arrays."""
    src = DATA_JS.read_text(encoding="utf-8")
    # data.js is `window.TINYNORD_DATA = {...};` — parse the JSON payload.
    m = re.search(r"window\.TINYNORD_DATA\s*=\s*(\{.*\});\s*$", src, re.S)
    if not m:
        raise SystemExit("could not parse data.js payload")
    data = json.loads(m.group(1))
    seen: dict[str, None] = {}
    for p in data.get("products", []):
        for u in p.get("images", []):
            if u and u not in seen:
                seen[u] = None
    return list(seen.keys())


def public_id_for(url_path: str) -> str:
    """Deterministic, collision-free public_id from the full relative path.

    Keeps folder structure as `/` segments (Cloudinary treats these as
    folders); sanitises each segment to [A-Za-z0-9_-]; drops the extension;
    namespaces under `tinynord/`.
    """
    rel = unquote(url_path)                     # decode %20 etc.
    rel = rel.rsplit(".", 1)[0]                 # drop extension
    parts = []
    for seg in rel.split("/"):
        seg = re.sub(r"[^A-Za-z0-9_-]+", "_", seg).strip("_")
        if seg:
            parts.append(seg)
    return "tinynord/" + "/".join(parts)


def local_file_for(url_path: str) -> Path:
    return ROOT / unquote(url_path)


def sign(params: dict) -> str:
    to_sign = "&".join(f"{k}={params[k]}" for k in sorted(params))
    return hashlib.sha1((to_sign + SECRET).encode()).hexdigest()


def upload(url_path: str, public_id: str) -> tuple[str, bool, str]:
    """Upload one file with overwrite. Returns (url_path, ok, message)."""
    fpath = local_file_for(url_path)
    if not fpath.exists():
        return (url_path, False, f"missing local file: {fpath}")
    ext = fpath.suffix.lower().lstrip(".")
    mime = "image/png" if ext == "png" else "image/jpeg"
    data_uri = f"data:{mime};base64," + base64.b64encode(fpath.read_bytes()).decode()
    ts = str(int(time.time()))
    signed = {"overwrite": "true", "public_id": public_id, "timestamp": ts}
    body = {
        **signed,
        "file": data_uri,
        "api_key": KEY,
        "signature": sign(signed),
    }
    data = urllib.parse.urlencode(body).encode()
    req = urllib.request.Request(
        f"https://api.cloudinary.com/v1_1/{CLOUD}/image/upload", data=data
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            out = json.loads(resp.read().decode())
        return (url_path, True, out.get("public_id", public_id))
    except urllib.error.HTTPError as e:
        return (url_path, False, f"HTTP {e.code}: {e.read().decode()[:200]}")
    except Exception as e:
        return (url_path, False, str(e))


def main() -> int:
    if not KEY or not SECRET:
        raise SystemExit("CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET missing (.env)")
    dry = "--dry-run" in sys.argv
    paths = distinct_image_paths()
    manifest = {u: public_id_for(u) for u in paths}
    print(f"{len(paths)} distinct images → {len(set(manifest.values()))} distinct public_ids",
          file=sys.stderr)
    # Sanity: public_ids must be unique.
    if len(set(manifest.values())) != len(paths):
        rev: dict[str, list[str]] = {}
        for u, pid in manifest.items():
            rev.setdefault(pid, []).append(u)
        for pid, us in rev.items():
            if len(us) > 1:
                print(f"  DUPLICATE public_id {pid}:\n    " + "\n    ".join(us), file=sys.stderr)
        raise SystemExit("public_id collision — fix scheme before uploading")

    if dry:
        for u in paths[:20]:
            print(f"  {u}\n    → {manifest[u]}", file=sys.stderr)
        print("(dry run — no uploads)", file=sys.stderr)
        OUT_MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=0), encoding="utf-8")
        print(f"wrote planned manifest → {OUT_MANIFEST}", file=sys.stderr)
        return 0

    ok = 0
    fail: list[tuple[str, str]] = []
    with ThreadPoolExecutor(max_workers=6) as ex:
        futs = {ex.submit(upload, u, manifest[u]): u for u in paths}
        for i, fut in enumerate(as_completed(futs), 1):
            u, good, msg = fut.result()
            if good:
                ok += 1
            else:
                fail.append((u, msg))
            if i % 25 == 0 or i == len(paths):
                print(f"  {i}/{len(paths)} (ok={ok} fail={len(fail)})", file=sys.stderr)

    OUT_MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=0), encoding="utf-8")
    print(f"uploaded ok={ok} fail={len(fail)}; manifest → {OUT_MANIFEST}", file=sys.stderr)
    for u, msg in fail[:20]:
        print(f"  FAIL {u}: {msg}", file=sys.stderr)
    return 1 if fail else 0


if __name__ == "__main__":
    sys.exit(main())
