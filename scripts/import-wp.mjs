/**
 * 既存サイト (https://okiku-den.co.jp/) の WordPress REST API から
 * 投稿・固定ページを取得し、src/data/*.json と public/uploads/ に移行するスクリプト。
 *
 *   node scripts/import-wp.mjs
 *
 * - 投稿は「施工事例 (works)」と「お知らせ (news)」に自動分類
 * - 施工カテゴリー・施工場所をタイトル/本文から推定
 * - 本文中の画像はすべてローカル (public/uploads) にダウンロードしてパスを書き換え
 */
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const ORIGIN = "https://okiku-den.co.jp";
const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const DATA = path.join(ROOT, "src", "data");
const UA = { "User-Agent": "Mozilla/5.0 (OKD site migration)" };

async function getJSON(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

/* ---------- 画像 ---------- */
const downloads = new Map(); // remote url -> local path

function localPathFor(url) {
  const u = new URL(url);
  const m = decodeURIComponent(u.pathname).match(/\/wp-content\/uploads\/(\d{4})\/(\d{2})\/(.+)$/);
  if (!m) return null;
  const [, y, mo, file] = m;
  const ext = path.extname(file).toLowerCase() || ".jpg";
  let base = path.basename(file, path.extname(file));
  if (!/^[A-Za-z0-9._-]+$/.test(base)) {
    base = "img-" + crypto.createHash("md5").update(file).digest("hex").slice(0, 10);
  }
  return `/uploads/${y}/${mo}/${base}${ext}`;
}

function register(url) {
  if (!url || !url.includes("okiku-den.co.jp/wp-content/uploads")) return url;
  const abs = url.startsWith("http") ? url : ORIGIN + url;
  const local = localPathFor(abs);
  if (!local) return url;
  downloads.set(abs, local);
  return local;
}

async function downloadAll() {
  const entries = [...downloads.entries()];
  let done = 0, skipped = 0, failed = 0;
  const queue = entries.slice();
  async function worker() {
    while (queue.length) {
      const [remote, local] = queue.shift();
      const dest = path.join(PUBLIC, local);
      try {
        await fs.access(dest);
        skipped++;
        continue;
      } catch {}
      try {
        // 日本語ファイル名などは URL エンコードして取得
        const u = new URL(remote);
        u.pathname = u.pathname.split("/").map((s) => encodeURIComponent(decodeURIComponent(s))).join("/");
        const res = await fetch(u, { headers: UA });
        const type = res.headers.get("content-type") || "";
        if (!res.ok || !type.startsWith("image/")) throw new Error(`${res.status} ${type}`);
        await fs.mkdir(path.dirname(dest), { recursive: true });
        await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
        done++;
      } catch (e) {
        failed++;
        console.warn("  ! failed", remote, e.message);
      }
    }
  }
  await Promise.all(Array.from({ length: 8 }, worker));
  console.log(`images: ${done} downloaded, ${skipped} cached, ${failed} failed`);
}

/* ---------- HTML ---------- */
const ENTITIES = { "&amp;": "&", "&#8216;": "‘", "&#8217;": "’", "&#8220;": "“", "&#8221;": "”", "&#8243;": "″", "&hellip;": "…", "&nbsp;": " ", "&#038;": "&", "&quot;": '"', "&#039;": "'", "&lt;": "<", "&gt;": ">" };
const decode = (s) => s.replace(/&#?[a-z0-9]+;/gi, (e) => ENTITIES[e] ?? (e.startsWith("&#") ? String.fromCodePoint(parseInt(e.slice(2), 10)) : e));

function bestSrc(tag) {
  const src = (tag.match(/ src="([^"]+)"/) || [])[1];
  const srcset = (tag.match(/ srcset="([^"]+)"/) || [])[1];
  if (!srcset) return src;
  const cands = srcset
    .split(",")
    .map((s) => s.trim().split(/\s+/))
    .map(([u, w]) => [u, parseInt(w, 10)])
    .filter(([, w]) => w <= 1200)
    .sort((a, b) => b[1] - a[1]);
  return cands[0]?.[0] || src;
}

function cleanHtml(html, alt) {
  let h = html;
  // 画像: 最適サイズを選択しローカル化
  h = h.replace(/<img[^>]*>/g, (tag) => {
    const src = register(bestSrc(tag));
    const w = (tag.match(/ width="(\d+)"/) || [])[1];
    const hh = (tag.match(/ height="(\d+)"/) || [])[1];
    return `<img src="${src}" alt="${alt}"${w ? ` width="${w}"` : ""}${hh ? ` height="${hh}"` : ""} loading="lazy" decoding="async">`;
  });
  // カラムはギャラリー用クラスへ
  h = h.replace(/<div class="wp-block-columns[^"]*"[^>]*>/g, '<div class="wp-cols">');
  h = h.replace(/<div class="wp-block-column[^"]*"[^>]*>/g, '<div class="wp-col">');
  // その他のクラス・style は削除
  h = h.replace(/<(figure|p|div|h\d|ul|ol|li|table|tbody|tr|td|strong|a)\s+([^>]*?)>/g, (m, t, attrs) => {
    const keepClass = (attrs.match(/class="(wp-cols|wp-col)"/) || [])[0];
    const href = (attrs.match(/href="([^"]+)"/) || [])[1];
    let out = `<${t}`;
    if (keepClass) out += " " + keepClass;
    if (t === "a" && href) {
      let fixed = href.replace(/^https:\/https:\/\/www\.instagram\.com\/okikuuden\/.*$/, "https://www.instagram.com/okikuuden/");
      const ext = /^https?:\/\//.test(fixed) && !fixed.includes("okiku-den.co.jp");
      out += ` href="${fixed}"` + (ext ? ' target="_blank" rel="noopener noreferrer"' : "");
    }
    return out + ">";
  });
  h = h.replace(/<\/?mark[^>]*>/g, "");
  h = h.replace(/<h1>/g, "<h2>").replace(/<\/h1>/g, "</h2>");
  // 空要素の除去
  for (let i = 0; i < 3; i++) {
    h = h.replace(/<div class="wp-col">\s*<\/div>/g, "");
    h = h.replace(/<div class="wp-cols">\s*<\/div>/g, "");
    h = h.replace(/<p>\s*(&nbsp;)?\s*<\/p>/g, "");
    h = h.replace(/<div>\s*<\/div>/g, "");
  }
  h = h.replace(/\n{2,}/g, "\n").trim();
  return h;
}

const textOf = (html) => decode(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

/* ---------- 分類 ---------- */
const WORK_RE = /工事|クリーニング|修理|点検|取付|新設|設置|撤去|取替|汚れ/;
const AREAS = ["那覇市", "浦添市", "宜野湾市", "沖縄市", "うるま市", "豊見城市", "糸満市", "南城市", "名護市", "北谷町", "与那原町", "西原町", "南風原町", "八重瀬町", "嘉手納町", "読谷村", "中城村", "北中城村", "恩納村"];

function workCategory(t) {
  if (/照明|電気|EV|防犯カメラ|間接照明/.test(t)) return "electric";
  if (/業務用|事務所|オフィス|店舗|医院|サーバー|天カセ|居酒屋|共用部|エントランス/.test(t)) return "business";
  if (/レンジフード|バスカラット|戸建|住宅|造作家具/.test(t)) return "housing";
  return "aircon";
}

function locationOf(title, text) {
  for (const a of AREAS) if (title.includes(a)) return a;
  const head = text.slice(0, 120);
  for (const a of AREAS) if (a !== "南城市" && head.includes(a)) return a;
  return "沖縄県内";
}

/* ---------- main ---------- */
async function main() {
  console.log("fetching posts...");
  const posts = [];
  for (let page = 1; ; page++) {
    const res = await fetch(`${ORIGIN}/wp-json/wp/v2/posts?per_page=100&page=${page}&_embed=1`, { headers: UA });
    if (!res.ok) break;
    const arr = await res.json();
    if (!arr.length) break;
    posts.push(...arr);
    if (arr.length < 100) break;
  }
  console.log(`  ${posts.length} posts`);

  const works = [];
  const news = [];
  for (const p of posts) {
    const title = decode(p.title.rendered).trim();
    const raw = p.content.rendered;
    const content = cleanHtml(raw, title.replace(/"/g, "&quot;"));
    const text = textOf(raw);
    const fm = p._embedded?.["wp:featuredmedia"]?.[0];
    let thumb = null;
    if (fm?.source_url && !fm.source_url.includes("no_image")) {
      const sizes = fm.media_details?.sizes || {};
      const pick = sizes.large || sizes.medium_large || sizes.full;
      thumb = register(pick?.source_url || fm.source_url);
    }
    if (!thumb) {
      const first = content.match(/<img src="([^"]+)"/);
      thumb = first ? first[1] : null;
    }
    const isWork = WORK_RE.test(title) && !p.categories.includes(5);
    const item = {
      id: p.id,
      date: p.date.slice(0, 10),
      modified: p.modified.slice(0, 10),
      title,
      excerpt: text.slice(0, 90),
      thumbnail: thumb,
      content,
      oldSlug: p.slug,
    };
    if (isWork) {
      works.push({ ...item, category: workCategory(title + " " + text.slice(0, 200)), location: locationOf(title, text) });
    } else {
      news.push({ ...item, label: p.categories.includes(5) ? "お知らせ" : "今日の沖空電" });
    }
  }

  console.log("fetching pages...");
  const pages = await getJSON(`${ORIGIN}/wp-json/wp/v2/pages?per_page=100`);
  const work = pages.find((x) => x.slug === "work");
  // 「沖空電のしごと」ページ: 見出しごとに写真を抽出
  const gallery = [];
  for (const sec of work.content.rendered.split(/<h2[^>]*>/).slice(1)) {
    const heading = decode(sec.slice(0, sec.indexOf("</h2>"))).trim();
    const images = [...sec.matchAll(/<img[^>]*>/g)].map((m) => {
      const w = +(m[0].match(/ width="(\d+)"/) || [])[1] || 0;
      const h = +(m[0].match(/ height="(\d+)"/) || [])[1] || 0;
      return { src: register(bestSrc(m[0])), width: w, height: h };
    });
    gallery.push({ heading, images });
  }

  // サイト共通画像
  const common = [
    "2023/05/slide1.jpg", "2023/05/slide2.jpg", "2023/05/slide3.jpg", "2023/05/slide4.jpg",
    "2023/05/company.jpg", "2023/05/work.jpg", "2023/05/recruit.jpg",
    "2023/05/logo_header-bg-black.png", "2023/05/logo_footer-bg-black.png",
    "2023/05/cropped-favicon-192x192.png", "2023/05/cropped-favicon-180x180.png",
    "2026/07/image-10.png", "2024/02/S__7381214-1.jpg",
    "2023/05/735E2BF3-2120-44F8-B9DC-F3FA7EB058F5-1024x768.jpg",
  ];
  common.forEach((c) => register(`${ORIGIN}/wp-content/uploads/${c}`));

  await fs.mkdir(DATA, { recursive: true });
  await fs.writeFile(path.join(DATA, "works.json"), JSON.stringify(works, null, 1));
  await fs.writeFile(path.join(DATA, "news.json"), JSON.stringify(news, null, 1));
  await fs.writeFile(path.join(DATA, "gallery.json"), JSON.stringify(gallery, null, 1));
  // 旧URL（デコード済みスラッグ）→ 新URL の対応表
  const redirects = {};
  for (const w of works) redirects[decodeURIComponent(w.oldSlug)] = `/works/${w.id}/`;
  for (const n of news) redirects[decodeURIComponent(n.oldSlug)] = `/news/${n.id}/`;
  await fs.writeFile(path.join(DATA, "redirects.json"), JSON.stringify(redirects, null, 1));
  console.log(`works: ${works.length}, news: ${news.length}, gallery sections: ${gallery.length}`);

  console.log(`downloading ${downloads.size} images...`);
  await downloadAll();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
