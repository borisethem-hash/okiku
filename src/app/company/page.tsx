import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumb, CtaBand, IconCircle, PageHero, SubTitle } from "@/components/Parts";
import Icon from "@/components/Icon";
import { COMPANY, REASONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "会社案内",
  description: "株式会社沖空電（OKD.Co.,Ltd）の会社案内。代表メッセージ、会社概要（沖縄県南城市佐敷津波古／設立2022年／建設業許可 電気工事業・管工事業）、アクセスマップをご案内します。",
  alternates: { canonical: "/company/" },
};

export default function CompanyPage() {
  const rows: [string, React.ReactNode][] = [
    ["社名", COMPANY.name],
    ["代表取締役", COMPANY.ceo],
    ["設立", COMPANY.established],
    ["資本金", COMPANY.capital],
    [
      "主な事業内容",
      <ul key="b" className="dot-list">
        {COMPANY.businesses.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>,
    ],
    ["所在地", <>〒{COMPANY.zip}<br />{COMPANY.address}</>],
    ["電話番号", <a key="t" href={COMPANY.telLink}>{COMPANY.tel}</a>],
    ["FAX番号", COMPANY.fax],
    ["営業時間", `${COMPANY.hours}（定休日：${COMPANY.holiday}）`],
    ["建設業許可", COMPANY.license],
    ["電気工事業", COMPANY.electricLicense],
  ];

  return (
    <>
      <PageHero
        en="ABOUT US"
        accent="会"
        title="社案内"
        lead={"沖縄の暮らしと、\n未来のために。"}
        text={"株式会社沖空電は、電気・空調の専門技術で\n地域の安心と快適な暮らしを支え続けます。"}
        image="/uploads/2023/05/slide2.jpg"
        catch={"沖縄の未来を\n電気と空調で\n支えます。"}
      />
      <Breadcrumb items={[{ label: "会社案内" }]} />

      <section className="section section--pale">
        <div className="container message">
          <div className="message__visual">
            <Image src="/uploads/2024/02/S__7381214-1.jpg" alt="沖縄の海" fill sizes="(max-width: 900px) 100vw, 460px" style={{ objectFit: "cover", objectPosition: "center 45%" }} />
            <p className="message__catch">
              <span>沖縄の暮らしに</span>
              <span>快適な未来を。</span>
            </p>
          </div>
          <div className="message__body">
            <SubTitle en="MESSAGE" title="代表メッセージ" />
            <p>
              私たち沖空電は、沖縄の地域社会に根ざし、
              <br className="pc" />
              電気工事・空調設備工事を通じて、快適で安全な暮らしを支えることを使命としています。
            </p>
            <p>
              沖縄の気候は高温多湿であり、電気や空調は日常生活に欠かせないライフラインです。
              <br className="pc" />
              私たちは、確かな技術と誠実な対応で、お客様の「快適」と「安心」を実現し、
              <br className="pc" />
              地域の発展に貢献してまいります。
            </p>
            <p className="message__thanks">
              皆さまの快適な生活のお役にたてますように。
              <br />
              些細なお困りごとでもお気軽にどうぞ♪
            </p>
            <p className="message__sign">
              代表取締役<strong>{COMPANY.ceo}</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="overview">
        <div className="container overview">
          <div className="overview__table">
            <SubTitle en="COMPANY" title="会社概要" />
            <p className="overview__lead">
              地域に根ざした信頼のパートナーとして、
              <br />
              これからも沖縄の暮らしを支え続けます。
            </p>
            <table className="table">
              <tbody>
                {rows.map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overview__photos">
            <figure>
              <div className="overview__photo">
                <Image src="/uploads/2024/03/img-bca1f83baf.jpg" alt="沖空電の看板" fill sizes="(max-width: 900px) 100vw, 480px" />
              </div>
              <figcaption>
                <strong>OKD.Co.,Ltd</strong>
                沖縄の地域に根ざした電気・空調の専門会社です。
              </figcaption>
            </figure>
            <figure>
              <div className="overview__photo overview__photo--wide">
                <Image src="/uploads/2023/05/slide3.jpg" alt="沖空電の工具と看板" fill sizes="(max-width: 900px) 100vw, 480px" />
              </div>
            </figure>
          </div>
        </div>
      </section>

      <section className="section section--sky">
        <div className="container strengths">
          <div className="strengths__head">
            <span className="subtitle__en">OUR STRENGTHS</span>
            <h2 className="strengths__title">沖空電が選ばれる理由</h2>
            <p>お客様の安心と快適な暮らしを支えるために、私たちは5つの強みを大切にしています。</p>
          </div>
          <ul className="strengths__list">
            {REASONS.filter((_, i) => i !== 3).map((r) => (
              <li key={r.no}>
                <IconCircle name={r.icon} size={60} />
                <h3>{r.short}</h3>
                <p>{r.text.split("。")[0]}。</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SubTitle en="ACCESS" title="アクセスマップ" id="access" />
          <div className="access">
            <div className="access__map">
              <iframe
                src={COMPANY.mapEmbed}
                title="株式会社沖空電の地図"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="access__info">
              <p className="access__name">{COMPANY.name}</p>
              <p>
                <Icon name="pin" size={18} />〒{COMPANY.zip}
                <br />
                {COMPANY.address}
              </p>
              <p>
                <Icon name="phone" size={18} />
                TEL：<a href={COMPANY.telLink}>{COMPANY.tel}</a>
                <br />
                FAX：{COMPANY.fax}
              </p>
              <a href={COMPANY.mapLink} target="_blank" rel="noopener noreferrer" className="btn btn--navy btn--sm">
                <Icon name="map" size={16} /> Googleマップで見る
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
