// お問い合わせ帯（フッター上）の背景画像を生成する
// デザイン案の「明るい沖縄の海＋両端にハイビスカスとヤシの葉」を SVG で描画し WebP に書き出す。
//   node scripts/make-cta-bg.mjs  →  public/images/cta-bg.webp
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const W = 2400;
const H = 560;
const OUT = path.join(process.cwd(), "public", "images", "cta-bg.webp");

// 再現性のある乱数
let seed = 20251103;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
const r = (a, b) => a + rnd() * (b - a);
const f = (n) => n.toFixed(1);

/* ---------- 海と空 ---------- */
const HORIZON = H * 0.2;
let sea = "";
// 雲
for (let i = 0; i < 14; i++) {
  const cx = r(200, W - 200), cy = r(10, HORIZON - 25);
  sea += `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(r(90, 220))}" ry="${f(r(14, 30))}" fill="#fff" opacity="${f(r(0.45, 0.85))}" filter="url(#b12)"/>`;
}
// 波のライン
for (let i = 0; i < 60; i++) {
  const y = HORIZON + 8 + Math.pow(rnd(), 1.4) * (H - HORIZON - 10);
  const depth = (y - HORIZON) / (H - HORIZON);
  const x = r(-100, W);
  const len = r(120, 520) * (0.5 + depth);
  const amp = 2 + depth * 8;
  let d = `M${f(x)} ${f(y)}`;
  for (let k = 1; k <= 4; k++) d += ` q${f(len / 8)} ${f(k % 2 ? -amp : amp)} ${f(len / 4)} 0`;
  sea += `<path d="${d}" stroke="#fff" stroke-width="${f(1 + depth * 3)}" fill="none" opacity="${f(r(0.12, 0.35))}" stroke-linecap="round"/>`;
}
// きらめき
for (let i = 0; i < 260; i++) {
  const y = HORIZON + 4 + Math.pow(rnd(), 1.7) * (H - HORIZON);
  const depth = (y - HORIZON) / (H - HORIZON);
  sea += `<ellipse cx="${f(r(0, W))}" cy="${f(y)}" rx="${f(r(3, 16) * (0.4 + depth))}" ry="${f(r(0.8, 2.4) * (0.5 + depth))}" fill="#fff" opacity="${f(r(0.35, 0.9))}"/>`;
}

/* ---------- 植物 ---------- */
const leafPath = (len, w) => `M0 0 Q${f(len * 0.45)} ${f(-w)} ${f(len)} 0 Q${f(len * 0.45)} ${f(w)} 0 0Z`;

// ヤシの葉：主軸に沿って細い小葉を並べる
function frond(x, y, angle, len, { color = "url(#gLeaf)", blur = "", droop = 0.35, opacity = 1 } = {}) {
  let g = `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(angle)})" opacity="${opacity}" ${blur ? `filter="url(#${blur})"` : ""}>`;
  const cy = len * droop;
  g += `<path d="M0 0 Q${f(len * 0.5)} ${f(-cy * 0.2)} ${f(len)} ${f(cy)}" stroke="#2f6b1f" stroke-width="${f(len / 90)}" fill="none"/>`;
  for (let t = 0.06; t <= 0.98; t += 0.035) {
    // 2次ベジェ上の点と接線
    const px = 2 * (1 - t) * t * len * 0.5 + t * t * len;
    const py = 2 * (1 - t) * t * (-cy * 0.2) + t * t * cy;
    const tx = 2 * (1 - t) * len * 0.5 + 2 * t * (len - len * 0.5);
    const ty = 2 * (1 - t) * (-cy * 0.2) + 2 * t * (cy + cy * 0.2);
    const base = (Math.atan2(ty, tx) * 180) / Math.PI;
    const l = len * 0.36 * Math.sin(Math.PI * (0.15 + t * 0.85)) + len * 0.05;
    for (const side of [-1, 1]) {
      g += `<path d="${leafPath(l, l * 0.07)}" transform="translate(${f(px)} ${f(py)}) rotate(${f(base + side * r(38, 52) + 14)})" fill="${color}"/>`;
    }
  }
  return g + "</g>";
}

// モンステラ風の大きな葉
function bigLeaf(x, y, angle, len, { blur = "", opacity = 1 } = {}) {
  const w = len * 0.42;
  let g = `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(angle)})" opacity="${opacity}" ${blur ? `filter="url(#${blur})"` : ""}>`;
  g += `<path d="M0 0 C${f(len * 0.2)} ${f(-w)} ${f(len * 0.8)} ${f(-w * 1.1)} ${f(len)} 0 C${f(len * 0.8)} ${f(w * 1.1)} ${f(len * 0.2)} ${f(w)} 0 0Z" fill="url(#gLeaf2)"/>`;
  g += `<path d="M${f(len * 0.02)} 0 L${f(len * 0.96)} 0" stroke="#bfe39a" stroke-width="${f(len / 70)}" opacity=".7"/>`;
  for (let i = 1; i < 7; i++) {
    const sx = (len * i) / 7.5;
    g += `<path d="M${f(sx)} 0 Q${f(sx + len * 0.08)} ${f(-w * 0.5)} ${f(sx + len * 0.16)} ${f(-w * 0.85)}" stroke="#a8d77d" stroke-width="${f(len / 160)}" fill="none" opacity=".55"/>`;
    g += `<path d="M${f(sx)} 0 Q${f(sx + len * 0.08)} ${f(w * 0.5)} ${f(sx + len * 0.16)} ${f(w * 0.85)}" stroke="#a8d77d" stroke-width="${f(len / 160)}" fill="none" opacity=".55"/>`;
  }
  return g + "</g>";
}

// ハイビスカス
function hibiscus(x, y, size, rot, { grad = "gRed", blur = "" } = {}) {
  const R = size;
  let g = `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(rot)})" ${blur ? `filter="url(#${blur})"` : ""}>`;
  for (let i = 0; i < 5; i++) {
    const a = i * 72 + r(-6, 6);
    const s = r(0.92, 1.08);
    g += `<path transform="rotate(${f(a)}) scale(${f(s)})" d="M0 0 C${f(-R * 0.75)} ${f(-R * 0.25)} ${f(-R * 0.85)} ${f(-R * 1.05)} ${f(-R * 0.15)} ${f(-R * 1.02)} Q0 ${f(-R * 0.94)} ${f(R * 0.15)} ${f(-R * 1.02)} C${f(R * 0.85)} ${f(-R * 1.05)} ${f(R * 0.75)} ${f(-R * 0.25)} 0 0Z" fill="url(#${grad})" stroke="#ffffff" stroke-opacity=".18" stroke-width="${f(R / 60)}"/>`;
    g += `<path transform="rotate(${f(a)})" d="M0 0 Q${f(R * 0.04)} ${f(-R * 0.4)} 0 ${f(-R * 0.8)}" stroke="#7a0016" stroke-width="${f(R / 70)}" fill="none" opacity=".35"/>`;
  }
  g += `<circle r="${f(R * 0.18)}" fill="#6b0012"/>`;
  // おしべ
  g += `<path d="M0 0 Q${f(R * 0.25)} ${f(-R * 0.35)} ${f(R * 0.55)} ${f(-R * 0.72)}" stroke="#ffd2d2" stroke-width="${f(R / 28)}" fill="none" stroke-linecap="round"/>`;
  for (let i = 0; i < 9; i++) {
    g += `<circle cx="${f(R * 0.5 + r(-R * 0.1, R * 0.12))}" cy="${f(-R * 0.68 + r(-R * 0.12, R * 0.08))}" r="${f(R * 0.035)}" fill="#ffd60a"/>`;
  }
  return g + "</g>";
}

let left = "";
let right = "";
// 奥（ぼかし）
left += frond(-40, 40, 8, 560, { blur: "b6", opacity: 0.75 });
left += frond(-60, H + 40, -40, 520, { blur: "b6", opacity: 0.8 });
right += frond(W + 40, 30, 172, 560, { blur: "b6", opacity: 0.75 });
right += frond(W + 60, H + 30, 220, 500, { blur: "b6", opacity: 0.8 });
// 中景
left += frond(-30, -20, 30, 430);
left += bigLeaf(-60, H - 60, -28, 360);
left += bigLeaf(-30, H + 30, -62, 300);
left += frond(-20, H * 0.55, -8, 380, { droop: 0.25 });
right += frond(W + 20, -10, 150, 430);
right += bigLeaf(W + 50, H - 40, 205, 360);
right += bigLeaf(W + 20, H + 40, 240, 300);
right += frond(W + 20, H * 0.6, 186, 360, { droop: 0.25 });
// 手前の花
left += hibiscus(150, H - 140, 120, 18);
left += hibiscus(40, H * 0.3, 92, -30, { grad: "gPink" });
left += hibiscus(300, H - 40, 70, 60);
right += hibiscus(W - 150, H - 150, 125, -12);
right += hibiscus(W - 50, H * 0.28, 88, 40, { grad: "gPink" });
right += hibiscus(W - 320, H - 30, 64, -50);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
  <linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#cdeefe"/><stop offset="1" stop-color="#9edcf7"/>
  </linearGradient>
  <linearGradient id="gSea" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#1aa3dc"/>
    <stop offset=".25" stop-color="#1fb6e6"/>
    <stop offset=".6" stop-color="#3fcfee"/>
    <stop offset="1" stop-color="#8fe7f0"/>
  </linearGradient>
  <radialGradient id="gGlow" cx=".5" cy=".55" r=".6">
    <stop offset="0" stop-color="#ffffff" stop-opacity=".28"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="gLeaf" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#2f7d22"/><stop offset="1" stop-color="#6fb43a"/>
  </linearGradient>
  <linearGradient id="gLeaf2" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#2a6f1e"/><stop offset=".6" stop-color="#4f9e2c"/><stop offset="1" stop-color="#8cc84b"/>
  </linearGradient>
  <radialGradient id="gRed" cx=".5" cy="1" r="1.05">
    <stop offset="0" stop-color="#9c0019"/><stop offset=".4" stop-color="#e0102c"/><stop offset=".85" stop-color="#ff3b3b"/><stop offset="1" stop-color="#ff7a6b"/>
  </radialGradient>
  <radialGradient id="gPink" cx=".5" cy="1" r="1">
    <stop offset="0" stop-color="#c2185b"/><stop offset=".5" stop-color="#f0507a"/><stop offset="1" stop-color="#ffa3b5"/>
  </radialGradient>
  <filter id="b12" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12"/></filter>
  <filter id="b6" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="6"/></filter>
  <filter id="b1"><feGaussianBlur stdDeviation="0.8"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#gSea)"/>
<rect width="${W}" height="${f(HORIZON)}" fill="url(#gSky)"/>
<rect y="${f(HORIZON - 3)}" width="${W}" height="8" fill="#e9fbff" opacity=".7" filter="url(#b1)"/>
<g filter="url(#b1)">${sea}</g>
<rect width="${W}" height="${H}" fill="url(#gGlow)"/>
${left}
${right}
</svg>`;

mkdirSync(path.dirname(OUT), { recursive: true });
await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(OUT);
console.log("written", OUT);
