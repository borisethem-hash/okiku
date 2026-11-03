import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsIndex, { newsPageCount } from "../../NewsIndex";

export function generateStaticParams() {
  const params = Array.from({ length: newsPageCount() - 1 }, (_, i) => ({ page: String(i + 2) }));
  // 1ページのみの場合も空配列にしない（ビルド時エラー回避。該当ページは404）
  return params.length ? params : [{ page: "2" }];
}

export async function generateMetadata({ params }: PageProps<"/news/page/[page]">): Promise<Metadata> {
  const { page } = await params;
  return { title: `お知らせ（${page}ページ目）`, alternates: { canonical: `/news/page/${page}/` } };
}

export default async function Page({ params }: PageProps<"/news/page/[page]">) {
  const n = Number((await params).page);
  if (!Number.isInteger(n) || n < 2 || n > newsPageCount()) notFound();
  return <NewsIndex page={n} />;
}
