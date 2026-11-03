import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorksIndex from "../../WorksIndex";
import { WORK_CATEGORIES, type ServiceSlug } from "@/lib/site";
import { categoryInfo } from "@/lib/content";

export function generateStaticParams() {
  return WORK_CATEGORIES.map((c) => ({ cat: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/works/category/[cat]">): Promise<Metadata> {
  const { cat } = await params;
  const c = categoryInfo(cat);
  if (!c) return {};
  return {
    title: `${c.label}の施工事例`,
    description: `沖空電が沖縄県内で手がけた${c.label}の施工事例一覧です。`,
    alternates: { canonical: `/works/category/${cat}/` },
  };
}

export default async function Page({ params }: PageProps<"/works/category/[cat]">) {
  const { cat } = await params;
  if (!categoryInfo(cat)) notFound();
  return <WorksIndex page={1} cat={cat as ServiceSlug} />;
}
