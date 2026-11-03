import type { Metadata } from "next";
import { Breadcrumb, CtaBand, JsonLd, PageHero, SectionTitle } from "@/components/Parts";
import Icon from "@/components/Icon";
import { FAQS } from "@/lib/site";

export const metadata: Metadata = {
  title: "よくある質問",
  description: "沖空電へのよくあるご質問。対応エリア、お見積もり、支払い方法、工事期間、緊急対応、法人・店舗の工事、エアコンクリーニングなどについてお答えします。",
  alternates: { canonical: "/faq/" },
};

export default function FaqPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <PageHero
        en="FAQ"
        title="よくある質問"
        lead={"お客様からよくいただくご質問をまとめました。\nお問い合わせの前にぜひご確認ください。"}
        image="/uploads/2025/01/img-50d8429044.jpg"
        position="center 30%"
        catch={"電気と空調で、\n沖縄の未来を\n支えます。"}
      />
      <Breadcrumb items={[{ label: "よくある質問" }]} />
      <section className="section section--pale">
        <div className="container container--narrow">
          <SectionTitle title="よくあるご質問" />
          <div className="faq">
            {FAQS.map((f, i) => (
              <details key={f.q} className="faq__item" open={i === 0}>
                <summary>
                  <span className="faq__q">Q</span>
                  {f.q}
                  <Icon name="chevron" size={18} className="faq__chev" />
                </summary>
                <div className="faq__a">
                  <span className="faq__a-mark">A</span>
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
          <p className="note center mt-40">上記以外のご質問も、お電話・お問い合わせフォームよりお気軽にどうぞ。</p>
        </div>
      </section>
      <CtaBand />
      <JsonLd data={ld} />
    </>
  );
}
