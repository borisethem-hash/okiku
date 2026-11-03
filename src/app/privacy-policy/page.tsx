import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Parts";
import privacy from "@/data/privacy.json";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "株式会社沖空電のプライバシーポリシー（個人情報の取扱いについて）。",
  alternates: { canonical: "/privacy-policy/" },
};

export default function PrivacyPage() {
  return (
    <>
      <div className="dhead">
        <div className="container">
          <p className="dhead__en">PRIVACY POLICY</p>
          <h1 className="dhead__title">プライバシーポリシー</h1>
        </div>
      </div>
      <Breadcrumb items={[{ label: "プライバシーポリシー" }]} />
      <section className="section section--pale">
        <div className="container article-wrap">
          <div className="article prose prose--policy" dangerouslySetInnerHTML={{ __html: privacy.html }} />
        </div>
      </section>
    </>
  );
}
