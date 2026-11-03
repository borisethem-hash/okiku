import Link from "next/link";
import Image from "next/image";
import HeroSlider from "@/components/HeroSlider";
import Icon from "@/components/Icon";
import { CtaBand, IconCircle, MoreButton, SectionTitle, CategoryBadge } from "@/components/Parts";
import { COMPANY, SERVICES, WORK_CATEGORIES } from "@/lib/site";
import { works, latestUpdates, formatDate } from "@/lib/content";

export const metadata = {
  alternates: { canonical: "/" },
};

const TOP_REASONS = [
  { icon: "pin" as const, title: "地域密着の対応", text: "沖縄の気候や地域特性を理解した\n迅速で丁寧な対応を心がけています。" },
  { icon: "shield" as const, title: "確かな技術と安全", text: "経験豊富な技術者による\n高品質な施工と徹底した安全管理。" },
  { icon: "clock" as const, title: "迅速・柔軟な対応", text: "急なトラブルやご相談にも\nスピーディーに対応いたします。" },
];

export default function Home() {
  // カテゴリーごとの最新施工事例
  const featured = WORK_CATEGORIES.map((c) => works.find((w) => w.category === c.slug)).filter((w) => !!w);
  const updates = latestUpdates(4);

  return (
    <>
      {/* ===== メインビジュアル ===== */}
      <section className="hero">
        <HeroSlider />
        <div className="hero__overlay" />
        <div className="container hero__inner">
          <p className="hero__brand">
            <span className="hero__brand-mark">
              <Image src="/logo-mark.png" alt="OKD" width={139} height={73} />
            </span>
            <span>
              <small>株式会社</small>沖空電
            </span>
          </p>
          <h1 className="hero__title">
            沖縄の暮らしを、
            <br />
            電気と空調で支える。
          </h1>
          <p className="hero__text">
            電気工事・空調設備の設計から施工、メンテナンスまで。
            <br />
            快適な空間づくりを、私たちがサポートします。
          </p>
          <div className="hero__btns">
            <Link href="/contact/#form" className="btn btn--yellow btn--lg">
              無料見積もり・相談する
              <Icon name="chevron" size={18} className="rot-90" />
            </Link>
            <a href={COMPANY.telLink} className="btn btn--ghost btn--lg">
              <Icon name="phone" size={20} />
              {COMPANY.tel}
            </a>
          </div>
        </div>
        <p className="hero__catch" aria-hidden="true">
          <span>つなぐ、</span>
          <span>支える、</span>
          <span>
            <em>沖縄</em>の未来。
          </span>
        </p>
      </section>

      {/* ===== ごあいさつ（既存サイトのメッセージ） ===== */}
      <section className="intro">
        <div className="container intro__inner">
          <p className="intro__catch">皆さまの快適な生活のお役にたてますように。</p>
          <p className="intro__text">
            家庭用エアコン工事、業務用エアコン工事や
            <br />
            一般電気工事、その他関連工事『日々全力！』で
            <br />
            沖縄県内各地を駆け回ってます！
            <br />
            些細なお困りごとでもお気軽にどうぞ♪
            <br />
            少しでも皆さまの快適な生活のお役に立てると嬉しいです。
          </p>
          <p className="intro__thanks">(人❛ᴗ❛)♪Thank You♪(❛ᴗ❛*人)</p>
        </div>
      </section>

      {/* ===== サービス ===== */}
      <section className="section section--navy">
        <div className="container">
          <SectionTitle title="沖空電のサービス" lead="電気と空調のプロフェッショナルが、安心・安全な施工を提供します。" light />
          <div className="svc-grid">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/service/${s.slug}/`} className="svc-card">
                <div className="svc-card__img">
                  <Image src={s.image} alt={s.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 290px" />
                </div>
                <div className="svc-card__body">
                  <h3 className="svc-card__title">
                    <Icon name={s.icon} size={26} className="is-yellow" />
                    {s.title}
                  </h3>
                  <p>{s.lead}</p>
                  <Icon name="arrow" size={18} className="svc-card__arrow" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 選ばれる理由 ===== */}
      <section className="section section--sky">
        <div className="container">
          <SectionTitle title="沖空電が選ばれる理由" />
          <div className="reason3">
            {TOP_REASONS.map((r) => (
              <div key={r.title} className="reason3__item">
                <IconCircle name={r.icon} size={72} />
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
          <div className="center mt-40">
            <MoreButton href="/reason/">選ばれる理由を詳しく見る</MoreButton>
          </div>
        </div>
      </section>

      {/* ===== 施工事例 ===== */}
      <section className="section section--navy section--works">
        <div className="container">
          <SectionTitle title="施工事例" lead="これまでに手がけた工事の一部をご紹介します。" light />
          <div className="wmini-grid">
            {featured.map((w) => (
              <Link key={w.id} href={`/works/${w.id}/`} className="wmini">
                <div className="wmini__img">
                  {w.thumbnail && <Image src={w.thumbnail} alt={w.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px" />}
                  <CategoryBadge slug={w.category} />
                </div>
                <div className="wmini__body">
                  <p className="wmini__loc">{w.location}</p>
                  <h3 className="wmini__title">{w.title}</h3>
                  <Icon name="arrow" size={16} className="wmini__arrow" />
                </div>
              </Link>
            ))}
          </div>
          <div className="center mt-40">
            <MoreButton href="/works/" variant="white">
              施工事例をもっと見る
            </MoreButton>
          </div>
        </div>
      </section>

      {/* ===== 新着情報 ===== */}
      <section className="section">
        <div className="container">
          <SectionTitle title="新着情報" />
          <div className="topnews">
            <div className="topnews__visual">
              <Image src="/uploads/2024/02/S__7381214-1.jpg" alt="沖縄の海" fill sizes="(max-width: 900px) 100vw, 420px" style={{ objectFit: "cover" }} />
              <p className="topnews__catch">
                <span>私たちの仕事が</span>
                <span>
                  <em>沖縄の未来</em>をつくる。
                </span>
              </p>
            </div>
            <div className="topnews__body">
              <p className="topnews__lead">お知らせや施工事例などの最新情報をお届けします。</p>
              <ul className="newslist">
                {updates.map((u) => (
                  <li key={u.href}>
                    <Link href={u.href}>
                      <time dateTime={u.date}>{formatDate(u.date)}</time>
                      <span className={`tag ${u.label === "施工事例" ? "tag--green" : "tag--blue"}`}>{u.label}</span>
                      <span className="newslist__title">{u.title}</span>
                      <Icon name="chevron" size={16} className="rot-90 newslist__arrow" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="right">
                <MoreButton href="/news/">新着情報一覧を見る</MoreButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
