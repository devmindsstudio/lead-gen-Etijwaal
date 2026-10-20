"""Download a photo, crop it to a slot's aspect ratio and save an optimised WebP into /public/img/<site>/.

Usage:
  python scripts/add-photo.py <image-url> <site-id> <name> <kind> [--focus 0.5,0.5]

kind:  hero   1920x1200 (16:10)  hero / background
       place  900x1125  (4:5)    "where it works" cards
       guide  1280x720  (16:9)   guide covers and headers

--focus x,y (0-1) keeps that point of the source in frame when cropping (default centre).
Prints the public src to paste into sites/<site-id>.json.
"""
import io
import sys
import urllib.request
from pathlib import Path

from PIL import Image, ImageOps

SIZES = {"hero": (1920, 1200), "place": (900, 1125), "guide": (1280, 720)}
ROOT = Path(__file__).resolve().parent.parent


def main() -> None:
    args = sys.argv[1:]
    focus = (0.5, 0.5)
    if "--focus" in args:
        i = args.index("--focus")
        fx, fy = (float(v) for v in args[i + 1].split(","))
        focus = (fx, fy)
        del args[i : i + 2]
    if len(args) != 4 or args[3] not in SIZES:
        sys.exit(__doc__)
    url, site, name, kind = args
    if not name.replace("-", "").isalnum() or name != name.lower():
        sys.exit("name must be lowercase kebab-case")

    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    img = ImageOps.exif_transpose(Image.open(io.BytesIO(data))).convert("RGB")

    w, h = SIZES[kind]
    if img.width < w * 0.75 or img.height < h * 0.75:
        print(f"warning: source is small ({img.width}x{img.height}) for a {kind} slot", file=sys.stderr)
    out = ImageOps.fit(img, (w, h), method=Image.Resampling.LANCZOS, centering=focus)

    dest = ROOT / "public" / "img" / site / f"{name}.webp"
    dest.parent.mkdir(parents=True, exist_ok=True)
    out.save(dest, "WEBP", quality=74, method=6)
    print(f"/img/{site}/{name}.webp  ({dest.stat().st_size // 1024} KB, {w}x{h})")


if __name__ == "__main__":
    main()
