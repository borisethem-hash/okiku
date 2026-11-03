import Link from "next/link";
import Image from "next/image";
import { COMPANY, SITE_URL, type IconName } from "@/lib/site";
import { categoryInfo, formatDate, excerptOf, type Work } from "@/lib/content";
import Icon from "./Icon";

/* ---------- 見出し ---------- */
export function SectionTitle({ title, lead, light = false, as: Tag = "h2" }: { title: string; lead?: React.ReactNode; light?: boolean; as?: "h1" | "h2" }) {
  return (
    <div className={`stitle${light ? " stitle--light" : ""}`}>
      <Tag className="stitle__h">{title}</Tag>
      {lead && <p className="stitle__lead">{lead}</p>}
    </div>
  );
}

export function SubTitle({ en, title, id }: { en?: string; title: string; id?: string }) {
  return (
    <div className="subtitle" id={id}>
      {en && <span className="subtitle__en">{en}</span>}
      <h2 className="subtitle__h">{title}</h2>
    </div>
  );
}

/* ---------- 下層ページのメインビジュアル ---------- */
export function PageHero({
  en,
  title,
  accent,
  lead,
  text,
  image,
  catch: catchCopy,
  position = "center",
}: {
  en: string;
  title: React.ReactNode;
  accent?: string;
  lead?: string;
  text?: string;
  image: string;
  catch?: string;
  position?: string;
}) {
  return (
    <section className="phero">
      <div className="phero__bg">
        <Image src={image} alt="" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: position }} />
      </div>
      <div className="container phero__inner">
        <p className="phero__en">{en}</p>
        <h1 className="phero__title">
          {accent && <span className="is-yellow">{accent}</span>}
          {title}
        </h1>
        {lead && <p className="phero__lead">{lead}</p>}
        {text && <p className="phero__text">{text}</p>}
      </div>
      {catchCopy && (
        <p className="phero__catch" aria-hidden="true">
          {catchCopy.split("\n").map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </p>
      )}
    </section>
  );
}

/* ---------- パンくず（構造化データ付き） ---------- */
export function Breadcrumb({ items }: { items: { href?: string; label: string }[] }) {
  const all = [{ href: "/", label: "ホーム" }, ...items];
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      ...(it.href ? { item: SITE_URL + it.href } : {}),
    })),
  };
  return (
    <nav className="breadcrumb" aria-label="パンくずリスト">
      <ol className="container">
        {all.map((it, i) => (
          <li key={i}>
            {it.href && i < all.length - 1 ? <Link href={it.href}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
      <JsonLd data={ld} />
    </nav>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/* ---------- ボタン ---------- */
export function MoreButton({ href, children, variant = "outline" }: { href: string; children: React.ReactNode; variant?: "outline" | "navy" | "white" }) {
  return (
    <Link href={href} className={`btn btn--${variant}`}>
      {children}
      <Icon name="arrow" size={16} />
    </Link>
  );
}

/* ---------- 施工事例カード ---------- */
export function CategoryBadge({ slug }: { slug: string }) {
  const c = categoryInfo(slug);
  if (!c) return null;
  return (
    <span className={`badge badge--${slug}`}>
      <Icon name={c.icon} size={15} />
      {c.label}
    </span>
  );
}

export function WorkCard({ work, priority = false }: { work: Work; priority?: boolean }) {
  return (
    <article className="wcard">
      <Link href={`/works/${work.id}/`} className="wcard__link">
        <div className="wcard__img">
          {work.thumbnail ? (
            <Image src={work.thumbnail} alt={work.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px" priority={priority} />
          ) : (
            <span className="noimage">NO IMAGE</span>
          )}
          <CategoryBadge slug={work.category} />
        </div>
        <div className="wcard__body">
          <h3 className="wcard__title">{work.title}</h3>
          {work.excerpt && <p className="wcard__text">{excerptOf(work.excerpt, 58)}</p>}
          <div className="wcard__meta">
            <span>
              <Icon name="calendar" size={14} />
              <time dateTime={work.date}>{formatDate(work.date)}</time>
            </span>
            <span>
              <Icon name="pin" size={14} />
              {work.location}
            </span>
            <Icon name="arrow" size={18} className="wcard__arrow" />
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ---------- ページネーション ---------- */
export function Pagination({ current, total, base }: { current: number; total: number; base: string }) {
  if (total <= 1) return null;
  const href = (p: number) => (p === 1 ? base : `${base}page/${p}/`);
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <nav className="pager" aria-label="ページ送り">
      {current > 1 ? (
        <Link href={href(current - 1)} className="pager__nav" aria-label="前のページ">
          <Icon name="chevron" size={18} className="rot90" />
        </Link>
      ) : (
        <span className="pager__nav is-disabled" aria-hidden="true">
          <Icon name="chevron" size={18} className="rot90" />
        </span>
      )}
      {pages.map((p) =>
        p === current ? (
          <span key={p} className="pager__num is-current" aria-current="page">
            {p}
          </span>
        ) : (
          <Link key={p} href={href(p)} className="pager__num">
            {p}
          </Link>
        ),
      )}
      {current < total ? (
        <Link href={href(current + 1)} className="pager__nav" aria-label="次のページ">
          <Icon name="chevron" size={18} className="rot-90" />
        </Link>
      ) : (
        <span className="pager__nav is-disabled" aria-hidden="true">
          <Icon name="chevron" size={18} className="rot-90" />
        </span>
      )}
    </nav>
  );
}

/* ---------- お問い合わせ帯（全ページ共通） ---------- */
export function CtaBand() {
  return (
    <section className="cta">
      <div className="cta__bg">
        <Image src="/images/cta-bg.webp" alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center" }} />
      </div>
      <div className="container cta__inner">
        <div className="cta__text">
          <p className="cta__title">
            電気・空調のことなら
            <br />
            沖空電にお任せください。
          </p>
          <p className="cta__sub">現地調査・お見積もりは無料です。まずはお気軽にご相談ください。</p>
        </div>
        <div className="cta__btns">
          <a href={COMPANY.telLink} className="cta__tel">
            <span>
              <Icon name="phone" size={24} />
              {COMPANY.tel}
            </span>
            <small>受付時間 {COMPANY.hours}</small>
          </a>
          <Link href="/contact/#form" className="cta__mail">
            <Icon name="mail" size={22} />
            メールでのお問い合わせ
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- アイコン丸 ---------- */
export function IconCircle({ name, size = 56 }: { name: IconName; size?: number }) {
  return (
    <span className="icircle" style={{ width: size, height: size }}>
      <Icon name={name} size={Math.round(size * 0.5)} />
    </span>
  );
}
