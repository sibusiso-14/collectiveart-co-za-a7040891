import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const PUBLIC = path.resolve("public");
const OUT = path.join(PUBLIC, "images");

// asset slot -> source Instagram screenshot
const MAP = {
  "dd1.jpg": "Screenshot_20260730_020740_com_instagram_android_InstagramMainActivity.jpg",
  "dd2.jpg": "Screenshot_20260730_020745_com_instagram_android_InstagramMainActivity.jpg",
  "dd3.jpg": "Screenshot_20260730_020812_com_instagram_android_InstagramMainActivity.jpg",
  "dd4.jpg": "Screenshot_20260730_020726_com_instagram_android_InstagramMainActivity.jpg",
  "dd5.jpg": "Screenshot_20260730_020730_com_instagram_android_InstagramMainActivity.jpg",
  "dd6.jpg": "Screenshot_20260730_020718_com_instagram_android_InstagramMainActivity.jpg",
  "gb1.jpg": "Screenshot_20260730_020551_com_instagram_android_TransparentModalActivity.jpg",
  "gb2.jpg": "Screenshot_20260730_020613_com_instagram_android_ModalActivity.jpg",
  "gb3.jpg": "Screenshot_20260730_020634_com_instagram_android_ModalActivity.jpg",
  "gb4.jpg": "Screenshot_20260730_020642_com_instagram_android_ModalActivity.jpg",
  "bc1.jpg": "Screenshot_20260730_022210_com_instagram_android_InstagramMainActivity.jpg",
  "bc2.jpg": "Screenshot_20260730_022217_com_instagram_android_InstagramMainActivity.jpg",
  "bc3.jpg": "Screenshot_20260730_022233_com_instagram_android_InstagramMainActivity.jpg",
  "bc4.jpg": "Screenshot_20260730_022239_com_instagram_android_InstagramMainActivity.jpg",
  "bc5.jpg": "Screenshot_20260730_022245_com_instagram_android_InstagramMainActivity.jpg",
  "lc1.jpg": "Screenshot_20260730_022904_com_instagram_android_InstagramMainActivity.jpg",
  "lc2.jpg": "Screenshot_20260730_022817_com_instagram_android_InstagramMainActivity.jpg",
  "lc3.jpg": "Screenshot_20260730_022824_com_instagram_android_InstagramMainActivity.jpg",
  "lc4.jpg": "Screenshot_20260730_022832_com_instagram_android_InstagramMainActivity.jpg",
  "lc5.jpg": "Screenshot_20260730_022838_com_instagram_android_InstagramMainActivity.jpg",
};

// A row is "chrome" (Instagram black bar) if it is overwhelmingly dark.
const DARK = 34; // mean brightness below this = black chrome
// A row is part of the blue "View product" CTA bar if it is strongly blue.
const isBlueRow = (r, g, b) => b > 120 && b - Math.max(r, g) > 35;

async function cropOne(outName, srcName) {
  const srcPath = path.join(PUBLIC, srcName);
  const img = sharp(srcPath);
  const meta = await img.metadata();
  const W = meta.width;
  const H = meta.height;

  // Pull raw RGB so we can measure brightness + blue dominance per row.
  const { data, info } = await sharp(srcPath)
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const ch = info.channels; // 3

  const bright = new Array(H).fill(0);
  const blue = new Array(H).fill(false);
  for (let y = 0; y < H; y++) {
    let sum = 0;
    let rS = 0;
    let gS = 0;
    let bS = 0;
    const base = y * W * ch;
    for (let x = 0; x < W; x++) {
      const i = base + x * ch;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      sum += (r + g + b) / 3;
      rS += r;
      gS += g;
      bS += b;
    }
    bright[y] = sum / W;
    blue[y] = isBlueRow(rS / W, gS / W, bS / W);
  }

  // Find the tallest contiguous run of non-dark rows = the product photo.
  let bestTop = 0;
  let bestBot = 0;
  let curTop = -1;
  for (let y = 0; y <= H; y++) {
    const nonDark = y < H && bright[y] >= DARK;
    if (nonDark && curTop === -1) curTop = y;
    if ((!nonDark || y === H) && curTop !== -1) {
      const top = curTop;
      const bot = y - 1;
      if (bot - top > bestBot - bestTop) {
        bestTop = top;
        bestBot = bot;
      }
      curTop = -1;
    }
  }

  // Trim a trailing blue CTA bar if it sits at the bottom of the band.
  let bot = bestBot;
  while (bot > bestTop && blue[bot]) bot--;
  // Small safety inset to drop anti-aliased chrome edges.
  let top = Math.min(bestTop + 2, bot);
  bot = Math.max(bot - 2, top);

  const height = bot - top + 1;
  await sharp(srcPath)
    .extract({ left: 0, top, width: W, height })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(OUT, outName));

  console.log(`[v0] ${outName} <- ${srcName}  crop y:${top}..${bot} (${height}/${H}px)`);
}

await mkdir(OUT, { recursive: true });
for (const [out, src] of Object.entries(MAP)) {
  await cropOne(out, src);
}
console.log("[v0] done");
