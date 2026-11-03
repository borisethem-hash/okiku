import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { Breadcrumb, CategoryBadge, CtaBand, JsonLd, MoreButton, SectionTitle, WorkCard } from "@/components/Parts";
import { SITE_URL, COMPANY } from "@/lib/site";
import { works, getWork, categoryInfo, formatDate, excerptOf } from "@/lib/content";

export function generateStaticParams() {
  return works.map((w) => ({ id: String(w.id) }));
}

export async function generateMetadata({ params }: PageProps<"/works/[id]">): Promise<Metadata> {
  const w = getWork(Number((await params).id));
  if (!w) return {};
  const cat = categoryInfo(w.category)?.label ?? "";
  const description = w.excerpt
    ? excerptOf(`${w.location}｜${w.excerpt}`, 110)
    : `${w.location}で沖空電が施工した「${w.title}」の施工事例です（${cat}）。`;
  return {
    title: `${w.title}｜施工事例`,
    description,
    alternates: { canonical: `/works/${w.id}/` },
    openGraph: { type: "article", images: w.thumbnail ? [w.thumbnail] : undefined, publishedTime: w.date },
  };
}

export default async function WorkDetail({ params }: PageProps<"/works/[id]">) {
  const id = Number((await params).id);
  const w = getWork(id);
  if (!w) notFound();
  const idx = works.findIndex((x) => x.id === id);
  const newer = works[idx - 1];
  const older = works[idx + 1];
  const related = works.filter((x) => x.category === w.category && x.id !== w.id).slice(0, 3);
  const cat = categoryInfo(w.category);

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: w.title,
    datePublished: w.date,
    dateModified: w.modified,
    image: w.thumbnail ? [SITE_URL + w.thumbnail] : undefined,
    author: { "@type": "Organization", name: COMPANY.name },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/works/${w.id}/`,
  };

  return (
    <>
      <div className="dhead">
        <div className="container">
          <p className="dhead__en">WORKS</p>
          <p className="dhead__title">施工事例</p>
        </div>
      </div>
      <Breadcrumb items={[{ href: "/works/", label: "施工事例" }, ...(cat ? [{ href: `/works/category/${cat.slug}/`, label: cat.label }] : []), { label: w.title }]} />

      <section className="section section--pale">
        <div className="container article-wrap">
          <article className="article">
            <header className="article__head">
              <CategoryBadge slug={w.category} />
              <h1 className="article__title">{w.title}</h1>
              <dl className="article__meta">
                <div>
                  <dt>
                    <Icon name="calendar" size={16} />
                    施工日
                  </dt>
                  <dd>
                    <time dateTime={w.date}>{formatDate(w.date)}</time>
                  </dd>
                </div>
                <div>
                  <dt>
                    <Icon name="pin" size={16} />
                    施工場所
                  </dt>
                  <dd>{w.location}</dd>
                </div>
                {cat && (
                  <div>
                    <dt>
                      <Icon name={cat.icon} size={16} />
                      施工内容
                    </dt>
                    <dd>{cat.label}</dd>
                  </div>
                )}
              </dl>
            </header>
            <div className="prose" dangerouslySetInnerHTML={{ __html: w.content }} />

            <nav className="prevnext" aria-label="前後の施工事例">
              {older ? (
                <Link href={`/works/${older.id}/`} className="prevnext__prev">
                  <small>前の施工事例</small>
                  <span>{older.title}</span>
                </Link>
              ) : (
                <span />
              )}
              <Link href="/works/" className="prevnext__list">
                一覧へ
              </Link>
              {newer ? (
                <Link href={`/works/${newer.id}/`} className="prevnext__next">
                  <small>次の施工事例</small>
                  <span>{newer.title}</span>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionTitle title="関連する施工事例" />
            <div className="wgrid">
              {related.map((r) => (
                <WorkCard key={r.id} work={r} />
              ))}
            </div>
            <div className="center mt-40">
              <MoreButton href="/works/">施工事例一覧へ</MoreButton>
            </div>
          </div>
        </section>
      )}

      <CtaBand />
      <JsonLd data={ld} />
    </>
  );
}
