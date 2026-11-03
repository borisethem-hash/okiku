import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import { Breadcrumb, CtaBand, PageHero, SectionTitle } from "@/components/Parts";
import { SERVICES, COMPANY } from "@/lib/site";

export const metadata: Metadata = {
  title: "サービス紹介",
  description:
    "沖空電のサービス紹介。電気設備工事・空調設備工事（家庭用／業務用エアコン）・法人・店舗向け設備工事・住宅向け工事、太陽光発電やEV充電設備まで、沖縄県内で幅広く対応します。",
  alternates: { canonical: "/service/" },
};

const OTHER = {
  title: "その他設備工事",
  icon: "wrench" as const,
  image: "/uploads/2023/05/5-2.jpg",
  lead: "上記以外の設備工事にも柔軟に対応いたします。",
  body: "太陽光発電システムやBS・CS・地上デジタル放送のアンテナ工事、家電の配達設置など、幅広い設備工事に対応可能です。現場の状況に応じて、最適なご提案をいたします。",
  items: ["太陽光発電工事", "BS、CS放送、地上デジタル放送システム", "家電配達設置工事"],
};

export default function ServicePage() {
  const cards = [...SERVICES.map((s) => ({ ...s, href: `/service/${s.slug}/` })), { ...OTHER, slug: "other", href: "#other" }];
  return (
    <>
      <PageHero
        en="SERVICE"
        accent="沖空電"
        title="のサービス"
        lead={"電気・空調のプロフェッショナルとして、\n沖縄の暮らしとビジネスを支えます。"}
        text={"株式会社沖空電は、電気工事・空調設備工事をはじめ、\n快適で安心できる環境づくりをトータルでサポートします。"}
        image="/uploads/2023/05/slide1.jpg"
        position="right center"
        catch={"つなぐ、\n支える、\n沖縄の未来。"}
      />
      <Breadcrumb items={[{ label: "サービス" }]} />

      <section className="section section--pale">
        <div className="container">
          <SectionTitle title="沖空電のサービス" lead={<>電気工事・空調設備工事をはじめ、幅広い設備工事で、<br className="pc" />お客様の快適な暮らしとビジネスをサポートします。</>} />
          <div className="svc5">
            {cards.map((c) => (
              <Link key={c.slug} href={c.href} className="svc5__card">
                <span className="svc5__icon">
                  <Icon name={c.icon} size={26} />
                </span>
                <div className="svc5__img">
                  <Image src={c.image} alt={c.title} fill sizes="(max-width: 640px) 50vw, 230px" />
                </div>
                <div className="svc5__body">
                  <h3>{c.title}</h3>
                  <p>{c.lead}</p>
                  <span className="svc5__arrow">
                    <Icon name="arrow" size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--pale pt-0">
        <div className="container">
          <h2 className="bar-title">サービスの詳細</h2>
          <div className="svc-rows">
            {[...SERVICES.map((s) => ({ ...s, href: `/service/${s.slug}/`, id: s.slug })), { ...OTHER, href: "/contact/#form", id: "other" }].map((s, i) => (
              <article key={s.id} id={s.id} className={`svc-row${i % 2 ? " is-reverse" : ""}`}>
                <div className="svc-row__img">
                  <Image src={s.image} alt={s.title} fill sizes="(max-width: 768px) 100vw, 360px" />
                </div>
                <div className="svc-row__body">
                  <h3 className="svc-row__title">
                    <span className="icircle icircle--sm">
                      <Icon name={s.icon} size={18} />
                    </span>
                    {s.title}
                  </h3>
                  <p>{s.body}</p>
                  <ul className="checklist">
                    {s.items.slice(0, 4).map((it) => (
                      <li key={it}>
                        <Icon name="check" size={16} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={s.href} className="btn btn--navy btn--sm svc-row__btn">
                  {s.id === "other" ? "ご相談はこちら" : "詳しく見る"}
                  <Icon name="arrow" size={16} />
                </Link>
              </article>
            ))}
          </div>
          <p className="note center mt-40">
            主な事業内容：{COMPANY.businesses.join("／")}
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
