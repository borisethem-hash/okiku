import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorksIndex, { worksPageCount } from "../../../../WorksIndex";
import { WORK_CATEGORIES, type ServiceSlug } from "@/lib/site";
import { categoryInfo } from "@/lib/content";

export function generateStaticParams() {
  const params = WORK_CATEGORIES.flatMap((c) =>
    Array.from({ length: worksPageCount(c.slug) - 1 }, (_, i) => ({ cat: c.slug, page: String(i + 2) })),
  );
  return params.length ? params : [{ cat: WORK_CATEGORIES[0].slug, page: "2" }];
}

export async function generateMetadata({ params }: PageProps<"/works/category/[cat]/page/[page]">): Promise<Metadata> {
  const { cat, page } = await params;
  const c = categoryInfo(cat);
  if (!c) return {};
  return { title: `${c.label}の施工事例（${page}ページ目）`, alternates: { canonical: `/works/category/${cat}/page/${page}/` } };
}

export default async function Page({ params }: PageProps<"/works/category/[cat]/page/[page]">) {
  const { cat, page } = await params;
  const n = Number(page);
  if (!categoryInfo(cat)) notFound();
  const slug = cat as ServiceSlug;
  if (!Number.isInteger(n) || n < 2 || n > worksPageCount(slug)) notFound();
  return <WorksIndex page={n} cat={slug} />;
}
