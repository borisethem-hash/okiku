import { NextResponse, type NextRequest } from "next/server";
import redirects from "@/data/redirects.json";

/**
 * 旧WordPressサイトの投稿URL（日本語スラッグ）を新URLへ301リダイレクト。
 * 例）/北谷町マンションエントランス　エアコン取替工事-2/ → /works/948/
 */
const MAP = redirects as Record<string, string>;

export function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // 旧サイトの ?p=123 形式
  const p = searchParams.get("p");
  if (pathname === "/" && p && /^\d+$/.test(p)) {
    const hit = Object.values(MAP).find((v) => v.endsWith(`/${p}/`));
    if (hit) return NextResponse.redirect(new URL(hit, req.url), 301);
  }

  let slug: string;
  try {
    slug = decodeURIComponent(pathname).replace(/^\/|\/$/g, "");
  } catch {
    return NextResponse.next();
  }
  const dest = MAP[slug] ?? MAP[slug.toLowerCase()];
  if (dest) return NextResponse.redirect(new URL(dest, req.url), 301);
  return NextResponse.next();
}

export const config = {
  // 静的ファイル・Next内部・API・新サイトの既知パスは除外
  matcher: ["/((?!_next/|api/|uploads/|works/|news/|service/|company/|contact/|reason/|area/|faq/|privacy-policy/|sitemap.xml|robots.txt|favicon.ico).*)"],
};
