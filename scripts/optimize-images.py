"""Create responsive WebP copies without changing the supplied originals.

Run with Python and Pillow; neither is required by the site's build/runtime.
"""
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
directory = root / "assets" / "images"
for source in sorted(directory.rglob("*")):
    if source.suffix.lower() not in (".png", ".jpg"):
        continue
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert("RGBA" if "A" in original.getbands() else "RGB")
        if source.stem == "hero-background":
            widths = (960, 1440, 1916)
        elif source.stem == "hero-logo":
            widths = (256, 450, 900)
        elif source.stem.startswith("depoimento-"):
            widths = (64, 128)
        else:
            widths = (320, 640, 960, 1254)
        for width in widths:
            if width > image.width:
                raise ValueError(f"Cannot upscale {source} to {width}px")
            height = round(image.height * width / image.width)
            resized = image.resize((width, height), Image.Resampling.LANCZOS)
            output = source.with_name(f"{source.stem}-{width}.webp")
            resized.save(output, "WEBP", quality=84, method=6)
        print(f"{source.relative_to(root)}: {source.stat().st_size:,} -> {output.stat().st_size:,} bytes (largest WebP)")
