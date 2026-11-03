import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb, CtaBand, PageHero, SectionTitle, WorkCard } from "@/components/Parts";
import Icon from "@/components/Icon";
import { AREAS, COMPANY } from "@/lib/site";
import { works } from "@/lib/content";

export const metadata: Metadata = {
  title: "対応エリア",
  description: "沖空電の対応エリア。南城市を拠点に、那覇市・浦添市・沖縄市・北谷町・与那原町など沖縄県内各地で電気工事・エアコン工事・空調設備工事に対応しています。",
  alternates: { canonical: "/area/" },
};

function Region({ title, list, counts }: { title: string; list: readonly string[]; counts: Map<string, number> }) {
  return (
    <div className="area__region">
      <h3>
        <Icon name="pin" size={20} />
        {title}
      </h3>
      <ul>
        {list.map((a) => (
          <li key={a} className={counts.has(a) ? "is-done" : undefined}>
            {a}
            {counts.has(a) && <small>実績{counts.get(a)}件</small>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AreaPage() {
  // 施工事例から実績のある地域を集計
  const counts = new Map<string, number>();
  for (const w of works) if (w.location !== "沖縄県内") counts.set(w.location, (counts.get(w.location) ?? 0) + 1);
  const recent = works.filter((w) => w.location !== "沖縄県内").slice(0, 3);


  return (
    <>
      <PageHero
        en="AREA"
        title="対応エリア"
        lead={"南城市を拠点に、\n沖縄県内各地を駆け回っています！"}
        image="/uploads/2024/02/S__7381214-1.jpg"
        position="center 40%"
        catch={"つなぐ、\n支える、\n沖縄の未来。"}
      />
      <Breadcrumb items={[{ label: "対応エリア" }]} />

      <section className="section section--pale">
        <div className="container">
          <SectionTitle
            title="沖縄県内各地に対応"
            lead={
              <>
                家庭用エアコン工事、業務用エアコン工事や一般電気工事、その他関連工事
                <br className="pc" />
                『日々全力！』で沖縄県内各地を駆け回ってます！
              </>
            }
          />
          <div className="area">
            <div className="area__base">
              <span className="icircle" style={{ width: 72, height: 72 }}>
                <Icon name="building" size={36} />
              </span>
              <p className="area__base-label">本社（拠点）</p>
              <p className="area__base-name">{COMPANY.name}</p>
              <p>
                〒{COMPANY.zip}
                <br />
                {COMPANY.address}
              </p>
              <Link href="/company/#access" className="btn btn--outline btn--sm">
                アクセスマップ <Icon name="arrow" size={14} />
              </Link>
            </div>
            <div className="area__lists">
              <Region title="本島南部エリア" list={AREAS.south} counts={counts} />
              <Region title="本島中部エリア" list={AREAS.middle} counts={counts} />
              <div className="area__region area__region--other">
                <h3>
                  <Icon name="map" size={20} />
                  その他の地域
                </h3>
                <p>本島北部・離島など上記以外の地域についても、工事内容によって対応可能な場合がございます。お気軽にご相談ください。</p>
              </div>
            </div>
          </div>
          <p className="note mt-24">
            <span className="legend" />
            …ホームページに施工事例を掲載している地域です。
          </p>
        </div>
      </section>

      {recent.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionTitle title="各地の施工事例" />
            <div className="wgrid">
              {recent.map((w) => (
                <WorkCard key={w.id} work={w} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
