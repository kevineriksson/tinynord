#!/usr/bin/env python3
"""Pull every asset's public_id from Cloudinary (Admin API) and write a
manifest mapping local-filename → cloudinary public_id.

Usage:
    export CLOUDINARY_API_KEY=...
    export CLOUDINARY_API_SECRET=...
    export CLOUDINARY_CLOUD_NAME=dqbtlzcft   # optional, defaults to dqbtlzcft
    python3 build/fetch_cloudinary.py

Reads:
    nothing — talks directly to Cloudinary.

Writes:
    data/cloudinary-manifest.json   { "<original-basename>": "<public_id>", ... }

Notes on key/secret:
    Cloudinary dashboard → Settings → Access Keys → copy "API Key" and
    "API Secret". Running this script does not modify or delete anything;
    it only reads metadata. The credentials never leave the build machine.
"""

import base64
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "cloudinary-manifest.json"

CLOUD = os.environ.get("CLOUDINARY_CLOUD_NAME", "dqbtlzcft")
KEY = os.environ.get("CLOUDINARY_API_KEY")
SECRET = os.environ.get("CLOUDINARY_API_SECRET")


def normalize_basename(name: str) -> str:
    """Mirror Cloudinary's auto-rename: 'AB CD (1).jpg' → 'AB_CD_1'.

    Cloudinary strips the extension on upload and converts whitespace +
    parens into underscores. We match against this normalized form so we
    can collapse e.g. '298917_2_o4rkwy' (uploaded id) back to '298917_2'
    (predicted from filename).
    """
    stem = name.rsplit(".", 1)[0]
    stem = re.sub(r"[\s()]+", "_", stem)
    stem = re.sub(r"_+", "_", stem).strip("_")
    return stem


def cloudinary_get(path: str) -> dict:
    """GET against Cloudinary Admin API (basic-auth)."""
    if not KEY or not SECRET:
        raise SystemExit(
            "CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET must be set in the "
            "environment. See script header for details."
        )
    url = f"https://api.cloudinary.com/v1_1/{CLOUD}{path}"
    auth = base64.b64encode(f"{KEY}:{SECRET}".encode()).decode()
    req = urllib.request.Request(url, headers={"Authorization": f"Basic {auth}"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


def fetch_all_public_ids() -> list[dict]:
    """Page through /resources/image to get every uploaded image."""
    out: list[dict] = []
    cursor: str | None = None
    page = 0
    while True:
        page += 1
        params = {"max_results": "500"}
        if cursor:
            params["next_cursor"] = cursor
        body = cloudinary_get(
            "/resources/image?" + urllib.parse.urlencode(params)
        )
        resources = body.get("resources", [])
        out.extend(resources)
        print(f"  page {page}: +{len(resources)} (total {len(out)})", file=sys.stderr)
        cursor = body.get("next_cursor")
        if not cursor:
            break
    return out


def main() -> int:
    print(f"Fetching all images from cloud {CLOUD}…", file=sys.stderr)
    resources = fetch_all_public_ids()

    # Build a lookup keyed by the normalized stem of the public_id, so we
    # can match against the local filename. When a public_id has Cloudinary's
    # auto unique-suffix (e.g. '298917_2_o4rkwy'), strip the trailing
    # 6-character random tail before matching.
    rand_tail = re.compile(r"_[a-z0-9]{6}$")
    manifest: dict[str, str] = {}
    for r in resources:
        pid = r["public_id"]                            # e.g. '298917_2_o4rkwy'
        stem_no_rand = rand_tail.sub("", pid)           # '298917_2'
        # Prefer entries without random suffix; if multiple assets collide on
        # the same predicted stem we keep the first one and warn.
        if stem_no_rand in manifest and manifest[stem_no_rand] != pid:
            print(
                f"  collision: {stem_no_rand} ← {manifest[stem_no_rand]} (kept) vs {pid}",
                file=sys.stderr,
            )
            continue
        manifest[stem_no_rand] = pid

    OUT.write_text(json.dumps(manifest, ensure_ascii=False, indent=0), encoding="utf-8")
    print(f"Wrote {len(manifest)} entries → {OUT}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
