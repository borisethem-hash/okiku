import Link from "next/link";
import Icon from "@/components/Icon";
import { Breadcrumb, CtaBand, PageHero, Pagination, SectionTitle, WorkCard } from "@/components/Parts";
import { WORK_CATEGORIES, type ServiceSlug } from "@/lib/site";
import { categoryInfo, paginate, worksByCategory, WORKS_PER_PAGE } from "@/lib/content";

export default function WorksIndex({ page, cat }: { page: number; cat?: ServiceSlug }) {
  const list = worksByCategory(cat);
  const { items, totalPages } = paginate(list, page, WORKS_PER_PAGE);
  const base = cat ? `/works/category/${cat}/` : "/works/";
  const catLabel = cat ? categoryInfo(cat)?.label : undefined;

  return (
    <>
      <PageHero
        en="WORKS"
        title="施工事例"
        lead={"沖空電が手がけた、電気工事・空調設備工事の\n施工事例をご紹介します。"}
        image="/uploads/2026/07/LINE_NOTE_260715_16-1024x768.jpg"
        catch={"確かな技術で、\n快適な暮らしを。"}
      />
      <Breadcrumb items={cat ? [{ href: "/works/", label: "施工事例" }, { label: catLabel! }] : [{ label: "施工事例" }]} />

      <section className="section section--pale">
        <div className="container">
          <SectionTitle title={catLabel ? `${catLabel}の施工事例` : "施工事例一覧"} lead="沖空電がこれまでに手がけた施工事例をご紹介します。" />

          <nav className="filter" aria-label="施工カテゴリー">
            <Link href="/works/" className={!cat ? "is-active" : undefined} aria-current={!cat ? "page" : undefined}>
              すべて
            </Link>
            {WORK_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/works/category/${c.slug}/`}
                className={cat === c.slug ? "is-active" : undefined}
                aria-current={cat === c.slug ? "page" : undefined}
              >
                <Icon name={c.icon} size={20} className={`filter__icon filter__icon--${c.slug}`} />
                {c.label}
              </Link>
            ))}
          </nav>

          <p className="count">
            全<strong>{list.length}</strong>件{totalPages > 1 && `（${page} / ${totalPages}ページ）`}
          </p>

          <div className="wgrid">
            {items.map((w, i) => (
              <WorkCard key={w.id} work={w} priority={i < 3} />
            ))}
          </div>

          <Pagination current={page} total={totalPages} base={base} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}

export function worksPageCount(cat?: ServiceSlug) {
  return Math.max(1, Math.ceil(worksByCategory(cat).length / WORKS_PER_PAGE));
}
