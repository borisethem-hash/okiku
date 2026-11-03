import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb, CtaBand, JsonLd } from "@/components/Parts";
import { SITE_URL, COMPANY } from "@/lib/site";
import { news, getNews, formatDate, excerptOf } from "@/lib/content";

export function generateStaticParams() {
  return news.map((n) => ({ id: String(n.id) }));
}

export async function generateMetadata({ params }: PageProps<"/news/[id]">): Promise<Metadata> {
  const n = getNews(Number((await params).id));
  if (!n) return {};
  return {
    title: `${n.title}｜お知らせ`,
    description: n.excerpt ? excerptOf(n.excerpt, 110) : `株式会社沖空電からのお知らせ「${n.title}」`,
    alternates: { canonical: `/news/${n.id}/` },
    openGraph: { type: "article", images: n.thumbnail ? [n.thumbnail] : undefined, publishedTime: n.date },
  };
}

export default async function NewsDetail({ params }: PageProps<"/news/[id]">) {
  const id = Number((await params).id);
  const n = getNews(id);
  if (!n) notFound();
  const idx = news.findIndex((x) => x.id === id);
  const newer = news[idx - 1];
  const older = news[idx + 1];

  const ld = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: n.title,
    datePublished: n.date,
    dateModified: n.modified,
    image: n.thumbnail ? [SITE_URL + n.thumbnail] : undefined,
    author: { "@type": "Organization", name: COMPANY.name },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/news/${n.id}/`,
  };

  return (
    <>
      <div className="dhead">
        <div className="container">
          <p className="dhead__en">NEWS</p>
          <p className="dhead__title">お知らせ</p>
        </div>
      </div>
      <Breadcrumb items={[{ href: "/news/", label: "お知らせ" }, { label: n.title }]} />
      <section className="section section--pale">
        <div className="container article-wrap">
          <article className="article">
            <header className="article__head">
              <p className="nlist__meta">
                <time dateTime={n.date}>{formatDate(n.date)}</time>
                <span className="tag tag--blue">{n.label}</span>
              </p>
              <h1 className="article__title">{n.title}</h1>
            </header>
            <div className="prose" dangerouslySetInnerHTML={{ __html: n.content }} />
            <nav className="prevnext" aria-label="前後のお知らせ">
              {older ? (
                <Link href={`/news/${older.id}/`} className="prevnext__prev">
                  <small>前の記事</small>
                  <span>{older.title}</span>
                </Link>
              ) : (
                <span />
              )}
              <Link href="/news/" className="prevnext__list">
                一覧へ
              </Link>
              {newer ? (
                <Link href={`/news/${newer.id}/`} className="prevnext__next">
                  <small>次の記事</small>
                  <span>{newer.title}</span>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </article>
        </div>
      </section>
      <CtaBand />
      <JsonLd data={ld} />
    </>
  );
}
