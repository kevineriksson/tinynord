#!/usr/bin/env python3
"""Upload assets/hero.jpg to Cloudinary so the hero image works in production.

Usage:
    export CLOUDINARY_API_KEY=...
    export CLOUDINARY_API_SECRET=...
    python3 build/upload_hero.py

Effect:
    - Uploads `assets/hero.jpg` with public_id 'tinynord-hero' (deterministic;
      no random suffix), overwrite=true so re-runs are idempotent.
    - Re-running fetch_cloudinary.py afterwards will include it in the
      manifest, but you don't have to: the hero markup is hard-wired below.
"""

import base64
import hashlib
import json
import os
import sys
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HERO = ROOT / "assets" / "hero.jpg"

CLOUD = os.environ.get("CLOUDINARY_CLOUD_NAME", "dqbtlzcft")
KEY = os.environ.get("CLOUDINARY_API_KEY")
SECRET = os.environ.get("CLOUDINARY_API_SECRET")
PUBLIC_ID = "tinynord-hero"


def sign(params: dict) -> str:
    """Cloudinary signed-upload signature (sha1 of sorted params + secret)."""
    sorted_pairs = sorted((k, v) for k, v in params.items() if v is not None)
    payload = "&".join(f"{k}={v}" for k, v in sorted_pairs) + SECRET
    return hashlib.sha1(payload.encode()).hexdigest()


def main() -> int:
    if not KEY or not SECRET:
        raise SystemExit(
            "CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET must be set in the environment."
        )
    if not HERO.exists():
        raise SystemExit(f"Hero file not found: {HERO}")

    timestamp = str(int(time.time()))
    params = {
        "public_id": PUBLIC_ID,
        "overwrite": "true",
        "timestamp": timestamp,
    }
    signature = sign(params)

    # Multipart body (without external libs).
    boundary = "----TinynordHeroUpload"
    eol = "\r\n"
    body = b""
    fields = {**params, "signature": signature, "api_key": KEY}
    for k, v in fields.items():
        body += f"--{boundary}{eol}".encode()
        body += f'Content-Disposition: form-data; name="{k}"{eol}{eol}'.encode()
        body += f"{v}{eol}".encode()
    body += f"--{boundary}{eol}".encode()
    body += f'Content-Disposition: form-data; name="file"; filename="{HERO.name}"{eol}'.encode()
    body += f"Content-Type: image/jpeg{eol}{eol}".encode()
    body += HERO.read_bytes() + eol.encode()
    body += f"--{boundary}--{eol}".encode()

    url = f"https://api.cloudinary.com/v1_1/{CLOUD}/image/upload"
    req = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": f"multipart/form-data; boundary={boundary}"},
    )
    print(f"Uploading {HERO.name} ({HERO.stat().st_size:,} bytes) → {CLOUD}/{PUBLIC_ID}…", file=sys.stderr)
    with urllib.request.urlopen(req, timeout=300) as resp:
        result = json.loads(resp.read().decode("utf-8"))
    print(f"OK — public_id: {result['public_id']}", file=sys.stderr)
    print(f"     URL:       {result['secure_url']}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
