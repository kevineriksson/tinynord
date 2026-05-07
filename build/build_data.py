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

# Products that should be split into one card per colour. Each entry maps the
# parent code to the absolute path of the directory whose first-level
# subfolders (case-insensitively matching the parent's `colors` array) hold
# the images for each colour.
COLOR_SPLIT_PRODUCTS = {
    "lux":            "STROLLERS/PRODUCT PICTURES/LUX",
    "active-comfort": "STROLLERS/PRODUCT PICTURES/ACTIVE_COMFORT",
}


def slugify(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def color_folder_for(parent_root: Path, color: str) -> Path | None:
    """Find the immediate child directory whose name matches `color` case-insensitively."""
    if not parent_root.is_dir():
        return None
    target = color.lower()
    for child in parent_root.iterdir():
        if child.is_dir() and child.name.lower() == target:
            return child
    return None


def expand_color_split(products: list[dict]) -> list[dict]:
    """Replace products with per-folder colour splits where applicable."""
    out: list[dict] = []
    for p in products:
        if p["code"] not in COLOR_SPLIT_PRODUCTS or not p.get("colors"):
            out.append(p)
            continue
        parent_root = PRODUCT_DIRS / COLOR_SPLIT_PRODUCTS[p["code"]]
        # Optional per-colour cover overrides on the parent: {"Brilliant black": "298918 (1)"}.
        # If a colour also has a parent-level `cover`, the per-colour one wins.
        color_covers = p.get("colorCovers") or {}
        for colour in p["colors"]:
            folder = color_folder_for(parent_root, colour)
            if folder is None:
                # No matching folder — skip this colour silently.
                continue
            child = dict(p)
            child.pop("colorCovers", None)
            child["code"] = f"{p['code']}-{slugify(colour)}"
            child["name"] = f"{p['name']} – {colour}"
            child["colors"] = [colour]
            # Stash the folder so find_images_for_product can locate it.
            child["_image_root"] = str(folder.relative_to(ROOT))
            if colour in color_covers:
                child["cover"] = color_covers[colour]
            out.append(child)
    return out


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


def find_images_for_product(product: dict, all_images: list[Path]) -> list[str]:
    """Return URL-encoded paths for images that belong to a product."""
    code = product["code"]
    matches: list[Path] = []

    image_root = product.get("_image_root")
    if image_root:
        # Colour-split product: only consider images under this folder.
        for img in all_images:
            rel_str = str(img.relative_to(ROOT))
            if rel_str.startswith(image_root):
                matches.append(img)
    elif code in FALLBACK_PATTERNS:
        fallback = FALLBACK_PATTERNS[code]
        for img in all_images:
            rel_str = str(img.relative_to(ROOT))
            if any(s in rel_str for s in fallback.get("contains_path", [])):
                matches.append(img)
            elif any(s in img.name for s in fallback.get("contains_filename", [])):
                matches.append(img)
    elif code.isdigit():
        # SKU-prefix match: the leading digit run of the filename equals the
        # primary code OR any sibling code listed under `extraSkus`.
        accepted_skus = {code, *(s for s in product.get("extraSkus", []) if s)}
        for img in all_images:
            m = SKU_RE.match(img.name)
            if not m:
                continue
            sku = m.group(1)
            if sku in accepted_skus:
                matches.append(img)
            # Combined-stem files like 305317_305318.jpg also belong to both SKUs.
            elif "_" in img.stem and any(s in img.stem.split("_") for s in accepted_skus):
                matches.append(img)

    # If the product names a `cover` image (filename substring), move it
    # to the front of the matches list so it becomes the card's primary photo.
    cover = product.get("cover")
    if cover:
        prioritized = [m for m in matches if cover.lower() in m.name.lower()]
        rest = [m for m in matches if cover.lower() not in m.name.lower()]
        matches = prioritized + rest

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


def normalize_basename(name: str) -> str:
    """Mirror Cloudinary's auto-rename: replace whitespace, parens and `&`
    with `_` (each char individually, no run-collapsing)."""
    import re as _re
    stem = name.rsplit(".", 1)[0]
    return _re.sub(r"[\s()&]+", "_", stem).strip("_")


def load_cloudinary_manifest() -> dict[str, str]:
    """Optional manifest: { '<normalized basename>': '<cloudinary public_id>' }."""
    manifest_path = ROOT / "data" / "cloudinary-manifest.json"
    if not manifest_path.exists():
        return {}
    try:
        return json.loads(manifest_path.read_text(encoding="utf-8"))
    except Exception as e:
        print(f"warning: could not parse {manifest_path}: {e}", file=sys.stderr)
        return {}


def main() -> int:
    products = json.loads(PRODUCTS_JSON.read_text(encoding="utf-8"))
    products = expand_color_split(products)
    images = gather_images()
    cloudinary_manifest = load_cloudinary_manifest()
    print(f"scanned {len(images)} images", file=sys.stderr)
    if cloudinary_manifest:
        print(f"loaded Cloudinary manifest: {len(cloudinary_manifest)} entries", file=sys.stderr)

    matched_total = 0
    unmatched_codes: list[str] = []
    cloud_hits = 0
    for p in products:
        urls = find_images_for_product(p, images)
        p["images"] = urls
        if urls:
            matched_total += len(urls)
        else:
            unmatched_codes.append(p["code"])
        # Attach Cloudinary public IDs in parallel to the local URLs so the
        # frontend can choose Cloudinary in production. Falls back to the
        # local path when no manifest entry exists.
        if cloudinary_manifest and urls:
            cloud_ids: list[str] = []
            for url in urls:
                # url looks like "PRODUCT%20CATEGORIES/.../303525(1).jpg"
                basename = url.rsplit("/", 1)[-1]
                from urllib.parse import unquote
                stem = normalize_basename(unquote(basename))
                pid = cloudinary_manifest.get(stem)
                if pid:
                    cloud_hits += 1
                cloud_ids.append(pid or "")
            p["cloudIds"] = cloud_ids
        # _image_root is a build-time helper, not needed in the runtime payload.
        p.pop("_image_root", None)

    print(f"matched {matched_total} image references across {len(products)} products", file=sys.stderr)
    if cloudinary_manifest:
        print(f"Cloudinary manifest hits: {cloud_hits} / {matched_total}", file=sys.stderr)
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
