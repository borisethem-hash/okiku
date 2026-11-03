import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorksIndex, { worksPageCount } from "../../WorksIndex";

export function generateStaticParams() {
  const params = Array.from({ length: worksPageCount() - 1 }, (_, i) => ({ page: String(i + 2) }));
  // 1ページのみの場合も空配列にしない（ビルド時エラー回避。該当ページは404）
  return params.length ? params : [{ page: "2" }];
}

export async function generateMetadata({ params }: PageProps<"/works/page/[page]">): Promise<Metadata> {
  const { page } = await params;
  return { title: `施工事例（${page}ページ目）`, alternates: { canonical: `/works/page/${page}/` } };
}

export default async function Page({ params }: PageProps<"/works/page/[page]">) {
  const n = Number((await params).page);
  if (!Number.isInteger(n) || n < 2 || n > worksPageCount()) notFound();
  return <WorksIndex page={n} />;
}
