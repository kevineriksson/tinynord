#!/usr/bin/env python3
"""Build data.js — combines products.json with scanned image paths.

Walks PRODUCT CATEGORIES (excluding IMAGO), groups images by SKU code or
folder heuristics, then emits a single `data.js` consumed by app.js.
"""

import json
import os
import re
import sys
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parent.parent
PRODUCT_DIRS = ROOT / "PRODUCT CATEGORIES"
PRODUCTS_JSON = ROOT / "data" / "products.json"
OUT_FILE = ROOT / "data.js"

# Image filename: leading digits = SKU. Examples: 303525(1).jpg, 297295(1)_LEON.jpg, 305317_305318.jpg
SKU_RE = re.compile(r"^(\d{3,7})")

# Manual fallbacks for products with non-numeric or missing codes,
# mapping to substrings/glob patterns that filenames or paths must contain.
FALLBACK_PATTERNS = {
    # Strollers — match by line + color folder
    "active-comfort": {"contains_path": ["STROLLERS/PRODUCT PICTURES/ACTIVE_COMFORT"]},
    "lux":            {"contains_path": ["STROLLERS/PRODUCT PICTURES/LUX"]},
    # Car accessories descriptive filenames
    "car-mirror-led":     {"contains_filename": ["car_mirror3-01"]},
    "car-mirror-textile": {"contains_filename": ["Car mirror2"]},
    "car-mirror-acrylic": {"contains_filename": ["Car mirror1"]},
    "car-sunshade-2pcs":  {"contains_filename": ["Sunshade.jpg"]},
    "car-low-back-protector": {"contains_filename": ["Protector&Kickmat-02"]},
    "car-kickmat-tablet":     {"contains_filename": ["Protector&Kickmat-01"]},
    "car-3in1-protector":     {"contains_filename": ["301496(3)", "9645"]},
}


def relpath_for_url(p: Path) -> str:
    """Path relative to project root, URL-encoded for the static server."""
    rel = p.relative_to(ROOT)
    parts = [quote(part, safe="(),&._-") for part in rel.parts]
    return "/".join(parts)


def gather_images() -> list[Path]:
    """Walk PRODUCT CATEGORIES, return all image paths (excluding IMAGO)."""
    images: list[Path] = []
    for dirpath, dirnames, filenames in os.walk(PRODUCT_DIRS):
        # Drop IMAGO subtrees in-place so os.walk doesn't descend into them.
        dirnames[:] = [d for d in dirnames if d.upper() != "IMAGO"]
        for fn in filenames:
            ext = fn.lower().rsplit(".", 1)[-1] if "." in fn else ""
            if ext in {"jpg", "jpeg", "png"}:
                images.append(Path(dirpath) / fn)
    return sorted(images)


def find_images_for_product(code: str, all_images: list[Path]) -> list[str]:
    """Return URL-encoded paths for images that belong to a product code."""
    matches: list[Path] = []

    fallback = FALLBACK_PATTERNS.get(code)
    if fallback:
        for img in all_images:
            rel_str = str(img.relative_to(ROOT))
            if any(s in rel_str for s in fallback.get("contains_path", [])):
                matches.append(img)
            elif any(s in img.name for s in fallback.get("contains_filename", [])):
                matches.append(img)
    elif code.isdigit():
        # SKU-prefix match: the leading digit run of the filename equals the code.
        for img in all_images:
            m = SKU_RE.match(img.name)
            if not m:
                continue
            sku = m.group(1)
            if sku == code:
                matches.append(img)
            # Combined-stem files like 305317_305318.jpg also belong to both SKUs.
            elif "_" in img.stem and code in img.stem.split("_"):
                matches.append(img)

    # De-dupe by URL AND by basename (same file copied into nested folders is
    # the same photo — keep the first occurrence only).
    seen_urls: set[str] = set()
    seen_basenames: set[str] = set()
    out: list[str] = []
    for p in matches:
        url = relpath_for_url(p)
        if url in seen_urls or p.name in seen_basenames:
            continue
        seen_urls.add(url)
        seen_basenames.add(p.name)
        out.append(url)
    return out


def main() -> int:
    products = json.loads(PRODUCTS_JSON.read_text(encoding="utf-8"))
    images = gather_images()
    print(f"scanned {len(images)} images", file=sys.stderr)

    matched_total = 0
    unmatched_codes: list[str] = []
    for p in products:
        urls = find_images_for_product(p["code"], images)
        p["images"] = urls
        if urls:
            matched_total += len(urls)
        else:
            unmatched_codes.append(p["code"])

    print(f"matched {matched_total} image references across {len(products)} products", file=sys.stderr)
    if unmatched_codes:
        print(f"products without images: {len(unmatched_codes)} — {unmatched_codes[:10]}{'…' if len(unmatched_codes) > 10 else ''}", file=sys.stderr)

    # Drop products that have zero images — they'd be empty cards.
    products_with_images = [p for p in products if p["images"]]
    print(f"writing {len(products_with_images)} products to data.js", file=sys.stderr)

    # Group by category for category counts.
    by_cat: dict[str, int] = {}
    for p in products_with_images:
        by_cat[p["category"]] = by_cat.get(p["category"], 0) + 1

    payload = {
        "products": products_with_images,
        "counts": by_cat,
    }
    OUT_FILE.write_text(
        "// Auto-generated by build/build_data.py — do not edit by hand.\n"
        "window.TINYNORD_DATA = " + json.dumps(payload, ensure_ascii=False, indent=0) + ";\n",
        encoding="utf-8",
    )
    print(f"wrote {OUT_FILE}", file=sys.stderr)
    print("category counts:", by_cat, file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())
