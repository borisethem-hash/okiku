import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb, CtaBand, IconCircle, PageHero, SectionTitle, JsonLd } from "@/components/Parts";
import Icon from "@/components/Icon";
import ContactForm from "@/components/ContactForm";
import { COMPANY, FAQS } from "@/lib/site";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "株式会社沖空電へのお問い合わせ・無料お見積もりのご依頼はこちら。電話（098-988-9953／受付8:00〜17:00）またはメールフォームで24時間受付中。沖縄県内の電気工事・エアコン工事はお気軽にご相談ください。",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  const faqs = FAQS.slice(0, 6);
  return (
    <>
      <PageHero
        en="CONTACT"
        title={
          <>
            お<span className="is-yellow">問</span>い合わせ
          </>
        }
        lead={"電気・空調のことでお困りのことがございましたら、\nお気軽にご相談ください。\n沖空電が、あなたの快適な暮らしをサポートします。"}
        image="/uploads/2023/05/slide1.jpg"
        position="right center"
        catch={"電気と空調で、\n沖縄の未来を\n支えます。"}
      />
      <Breadcrumb items={[{ label: "お問い合わせ" }]} />

      <section className="section section--pale">
        <div className="container">
          <SectionTitle title="お問い合わせ方法" lead="ご都合に合わせて、下記の方法からお気軽にご連絡ください。" />
          <div className="methods">
            <div className="method">
              <IconCircle name="phone" size={60} />
              <h3>電話でのお問い合わせ</h3>
              <p>
                直接ご相談したい方はお電話ください。
                <br />
                スタッフが丁寧に対応いたします。
              </p>
              <a href={COMPANY.telLink} className="btn btn--yellow btn--block btn--tel">
                <span>
                  <Icon name="phone" size={18} />
                  {COMPANY.tel}
                </span>
                <small>受付時間 {COMPANY.hours}</small>
              </a>
            </div>
            <div className="method">
              <IconCircle name="mail" size={60} />
              <h3>メールでのお問い合わせ</h3>
              <p>
                24時間いつでも受付しております。
                <br />
                確認後、担当者よりご連絡いたします。
              </p>
              <a href="#form" className="btn btn--navy btn--block">
                <Icon name="mail" size={18} />
                メールフォームへ
              </a>
            </div>
            <div className="method">
              <IconCircle name="doc" size={60} />
              <h3>お見積り依頼</h3>
              <p>
                工事内容や現地調査のお見積り依頼は
                <br />
                こちらからお気軽にどうぞ。（無料）
              </p>
              <a href="#estimate" className="btn btn--navy btn--block">
                見積りフォームへ
                <Icon name="arrow" size={16} />
              </a>
            </div>
            <div className="method">
              <IconCircle name="pin" size={60} />
              <h3>アクセス</h3>
              <p>
                本社へのアクセス方法や
                <br />
                地図はこちらからご確認いただけます。
              </p>
              <Link href="/company/#access" className="btn btn--navy btn--block">
                <Icon name="pin" size={18} />
                地図を見る
              </Link>
            </div>
          </div>

          <div className="contact-main" id="form">
            <span id="estimate" className="anchor" aria-hidden="true" />
            <aside className="contact-side">
              <h2 className="bar-title bar-title--sm">お電話でのお問い合わせ</h2>
              <a href={COMPANY.telLink} className="contact-side__tel">
                <span className="icircle" style={{ width: 48, height: 48 }}>
                  <Icon name="phone" size={24} />
                </span>
                <span>
                  <strong>{COMPANY.tel}</strong>
                  <small>受付時間 {COMPANY.hours}（平日）</small>
                </span>
              </a>

              <h2 className="contact-side__h">
                <Icon name="building" size={26} />
                会社情報
              </h2>
              <p className="contact-side__name">{COMPANY.name}</p>
              <p className="contact-side__addr">
                〒{COMPANY.zip} {COMPANY.address}
              </p>
              <dl className="contact-side__dl">
                <div>
                  <dt>TEL</dt>
                  <dd>{COMPANY.tel}</dd>
                </div>
                <div>
                  <dt>FAX</dt>
                  <dd>{COMPANY.fax}</dd>
                </div>
                <div>
                  <dt>営業時間</dt>
                  <dd>{COMPANY.hours}（平日）</dd>
                </div>
                <div>
                  <dt>定休日</dt>
                  <dd>{COMPANY.holiday}</dd>
                </div>
              </dl>
              <div className="contact-side__map">
                <iframe src={COMPANY.mapEmbed} title="株式会社沖空電の地図" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                <a href={COMPANY.mapLink} target="_blank" rel="noopener noreferrer" className="btn btn--navy btn--sm">
                  Googleマップで見る <Icon name="pin" size={16} />
                </a>
              </div>
            </aside>

            <div className="contact-form">
              <h2 className="contact-form__h">
                <Icon name="mail" size={30} />
                お問い合わせフォーム
              </h2>
              <p className="contact-form__lead">
                下記のフォームに必要事項をご入力のうえ、送信してください。
                <br />
                <span className="req">※</span>は必須項目です。
              </p>
              <ContactForm />
            </div>
          </div>

          <div className="cfaq">
            <div className="cfaq__head">
              <h2>
                <Icon name="question" size={30} />
                よくあるご質問
              </h2>
              <p>お客様からよくいただくご質問をまとめました。お問い合わせの前にぜひご確認ください。</p>
              <Link href="/faq/" className="btn btn--outline btn--sm">
                よくあるご質問をもっと見る <Icon name="arrow" size={16} />
              </Link>
            </div>
            <div className="cfaq__grid">
              {faqs.map((f) => (
                <details key={f.q} className="faq__item faq__item--sm">
                  <summary>
                    {f.q}
                    <Icon name="chevron" size={16} className="faq__chev" />
                  </summary>
                  <div className="faq__a">
                    <p>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "お問い合わせ｜株式会社沖空電",
        }}
      />
    </>
  );
}
