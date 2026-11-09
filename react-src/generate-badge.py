from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1024, 1440
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "lzy-badge-back.png"
FONT_DIR = Path("C:/Windows/Fonts")

image = Image.new("RGB", (WIDTH, HEIGHT))
draw = ImageDraw.Draw(image)
for y in range(HEIGHT):
    t = y / (HEIGHT - 1)
    color = (
        round(13 + 5 * t),
        round(24 + 8 * t),
        round(29 + 9 * t),
    )
    draw.line((0, y, WIDTH, y), fill=color)

for x in range(0, WIDTH, 64):
    draw.line((x, 0, x, HEIGHT), fill=(20, 38, 43), width=1)
for y in range(0, HEIGHT, 64):
    draw.line((0, y, WIDTH, y), fill=(20, 38, 43), width=1)
for offset in range(-HEIGHT, WIDTH, 160):
    draw.line((offset, HEIGHT, offset + HEIGHT, 0), fill=(18, 34, 39), width=1)

draw.rounded_rectangle((38, 38, WIDTH - 38, HEIGHT - 38), radius=38, outline=(74, 105, 105), width=2)
draw.line((78, 190, WIDTH - 78, 190), fill=(120, 207, 197), width=3)
draw.rectangle((78, 190, 250, 196), fill=(200, 178, 133))

mono = lambda size, bold=False: ImageFont.truetype(str(FONT_DIR / ("consolab.ttf" if bold else "consola.ttf")), size)
sans = lambda size, bold=False: ImageFont.truetype(str(FONT_DIR / ("msyhbd.ttc" if bold else "msyh.ttc")), size)

draw.text((78, 104), "LZY ENGINEER STATION", font=mono(31, True), fill=(200, 178, 133))
draw.text((WIDTH - 78, 111), "0324", font=mono(25), fill=(120, 207, 197), anchor="ra")

draw.text((78, 258), "LIU ZHIYUAN", font=mono(30, True), fill=(120, 207, 197))
draw.text((72, 312), "刘致远", font=sans(94, True), fill=(241, 239, 229))
draw.text((78, 452), "数据分析工程师 · 嵌入式创客", font=sans(38), fill=(200, 178, 133))

draw.rounded_rectangle((72, 554, WIDTH - 72, 674), radius=18, fill=(20, 42, 46), outline=(62, 92, 91), width=2)
draw.text((104, 579), "ROLE", font=mono(27, True), fill=(120, 207, 197))
draw.text((104, 619), "CEO · 技术负责人", font=sans(34, True), fill=(237, 237, 226))

draw.text((78, 754), "CONTACT", font=mono(27, True), fill=(120, 207, 197))
draw.line((78, 800, WIDTH - 78, 800), fill=(62, 92, 91), width=2)

draw.text((78, 842), "MAIL", font=mono(27, True), fill=(200, 178, 133))
draw.text((78, 889), "3107190237@qq.com", font=mono(38), fill=(237, 237, 226))
draw.text((78, 982), "TEL", font=mono(27, True), fill=(200, 178, 133))
draw.text((78, 1029), "15026727430", font=mono(42), fill=(237, 237, 226))

draw.line((78, 1172, WIDTH - 78, 1172), fill=(62, 92, 91), width=2)
draw.text((78, 1212), "DATA · HARDWARE · BUSINESS", font=mono(29, True), fill=(120, 207, 197))
draw.text((78, 1306), "ENGINEER × CREATOR", font=mono(24), fill=(143, 157, 154))
draw.text((WIDTH - 78, 1306), "LZY / 0324", font=mono(24), fill=(200, 178, 133), anchor="ra")

OUT.parent.mkdir(parents=True, exist_ok=True)
image.save(OUT, format="PNG", optimize=True)
print(f"Generated {OUT} ({WIDTH}x{HEIGHT})")
