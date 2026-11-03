import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import { Breadcrumb, CtaBand, PageHero, Pagination, SectionTitle } from "@/components/Parts";
import { COMPANY } from "@/lib/site";
import { news, paginate, formatDate, excerptOf, NEWS_PER_PAGE } from "@/lib/content";

export function newsPageCount() {
  return Math.max(1, Math.ceil(news.length / NEWS_PER_PAGE));
}

export default function NewsIndex({ page }: { page: number }) {
  const { items, totalPages } = paginate(news, page, NEWS_PER_PAGE);
  return (
    <>
      <PageHero
        en="NEWS"
        title="お知らせ"
        lead={"沖空電からのお知らせや\nキャンペーン情報をお届けします。"}
        image="/uploads/2023/05/slide2.jpg"
        catch={"沖縄の暮らしに\n安心と快適を。"}
      />
      <Breadcrumb items={[{ label: "お知らせ" }]} />
      <section className="section section--pale">
        <div className="container container--narrow">
          <SectionTitle title="お知らせ一覧" />
          <ul className="nlist">
            {items.map((n, i) => (
              <li key={n.id}>
                <Link href={`/news/${n.id}/`} className="nlist__item">
                  <div className="nlist__img">
                    {n.thumbnail ? (
                      <Image src={n.thumbnail} alt={n.title} fill sizes="200px" priority={i < 2} />
                    ) : (
                      <Image src="/uploads/2023/05/cropped-favicon-192x192.png" alt="" fill sizes="200px" className="is-logo" />
                    )}
                  </div>
                  <div className="nlist__body">
                    <p className="nlist__meta">
                      <time dateTime={n.date}>{formatDate(n.date)}</time>
                      <span className="tag tag--blue">{n.label}</span>
                    </p>
                    <h2 className="nlist__title">{n.title}</h2>
                    {n.excerpt && <p className="nlist__text">{excerptOf(n.excerpt, 70)}</p>}
                  </div>
                  <Icon name="arrow" size={18} className="nlist__arrow" />
                </Link>
              </li>
            ))}
          </ul>
          <Pagination current={page} total={totalPages} base="/news/" />

          <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer" className="insta-banner">
            <Icon name="instagram" size={34} />
            <span>
              <strong>Instagram開設しました！</strong>
              <small>@{COMPANY.instagramId} で日々の施工の様子を発信中</small>
            </span>
            <Icon name="arrow" size={18} />
          </a>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
