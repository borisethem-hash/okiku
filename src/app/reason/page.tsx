import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb, CtaBand, IconCircle, PageHero, SectionTitle } from "@/components/Parts";
import Icon from "@/components/Icon";
import { REASONS, COMPANY } from "@/lib/site";
import { works } from "@/lib/content";

export const metadata: Metadata = {
  title: "選ばれる理由",
  description: "沖空電が沖縄のお客様に選ばれる5つの理由。確かな技術力と経験、安心・安全の施工品質、地域密着のスピード対応、幅広い対応力、お客様第一の丁寧な対応をご紹介します。",
  alternates: { canonical: "/reason/" },
};

export default function ReasonPage() {
  return (
    <>
      <PageHero
        en="REASON"
        title={
          <>
            沖空電が
            <br />
            <span className="is-yellow">選ばれる</span>理由
          </>
        }
        lead={"沖空電は、電気・空調のプロフェッショナルとして、\n確かな技術力と地域密着のサービスで\n多くのお客様に選ばれています。"}
        image="/uploads/2023/05/slide4.jpg"
        catch={"安心の技術で、\n快適な暮らしを\n支えます。"}
      />
      <Breadcrumb items={[{ label: "選ばれる理由" }]} />

      <section className="section section--ocean">
        <div className="container">
          <SectionTitle
            title="沖空電が選ばれる理由"
            lead={
              <>
                お客様に安心してご依頼いただけるよう、
                <br />
                私たちが大切にしている5つのポイントをご紹介します。
              </>
            }
          />
          <div className="reason5">
            {REASONS.map((r, i) => (
              <article key={r.no} className={`reason5__card${i < 2 ? " is-wide" : ""}`} id={`reason${r.no}`}>
                <span className="reason5__no">{r.no}</span>
                <div className="reason5__head">
                  <div className="reason5__ttl">
                    <IconCircle name={r.icon} size={i < 2 ? 64 : 56} />
                    <h3>{r.title}</h3>
                  </div>
                  <div className="reason5__img">
                    <Image src={r.image} alt="" fill sizes="(max-width: 768px) 50vw, 260px" />
                  </div>
                </div>
                <p>{r.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle title="数字で見る沖空電" />
          <ul className="stats">
            <li>
              <Icon name="doc" size={34} />
              <strong>
                {works.length}
                <small>件以上</small>
              </strong>
              <span>ホームページ掲載の施工事例</span>
            </li>
            <li>
              <Icon name="shield" size={34} />
              <strong>
                2<small>業種</small>
              </strong>
              <span>建設業許可（電気工事業／管工事業）</span>
            </li>
            <li>
              <Icon name="wrench" size={34} />
              <strong>
                {COMPANY.businesses.length}
                <small>分野</small>
              </strong>
              <span>空調・電気・住宅設備など幅広い事業</span>
            </li>
            <li>
              <Icon name="pin" size={34} />
              <strong>
                沖縄<small>県内各地</small>
              </strong>
              <span>南城市から県内各地へ</span>
            </li>
          </ul>
          <div className="reason-links">
            <Link href="/works/" className="btn btn--navy">
              施工事例を見る <Icon name="arrow" size={16} />
            </Link>
            <Link href="/area/" className="btn btn--outline">
              対応エリアを見る <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
