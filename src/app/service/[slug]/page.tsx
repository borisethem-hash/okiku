import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { Breadcrumb, CtaBand, MoreButton, PageHero, SectionTitle, SubTitle, WorkCard, JsonLd } from "@/components/Parts";
import { SERVICES, SITE_URL, COMPANY, FAQS } from "@/lib/site";
import { gallery, worksByCategory } from "@/lib/content";

const META: Record<string, { title: string; description: string; catch: string; heroImage: string; introImage: string; faq: number[] }> = {
  aircon: {
    title: "空調・エアコン工事",
    description: "沖縄県内の家庭用ルームエアコン・業務用エアコンの新設・取替・修理・クリーニングは沖空電へ。天井カセット形エアコンや換気設備工事にも対応。現地調査・お見積もり無料。",
    catch: "確かな技術で、\n快適な暮らしを。",
    heroImage: "/uploads/2024/05/F145B731-090E-4C58-B6F4-F37E10E3318A-1024x768.jpg",
    introImage: "/uploads/2025/04/LINE_NOTE_250317_17-1024x768.jpg",
    faq: [1, 3, 6],
  },
  electric: {
    title: "電気工事",
    description: "沖縄県内の一般電気工事・分電盤工事・照明設備工事（LED化）・EV充電コンセント設置・太陽光発電・アンテナ工事は沖空電へ。電気工事業登録済みの専門技術者が対応します。",
    catch: "安心の技術で、\n快適な暮らしを\n支えます。",
    heroImage: "/uploads/2024/06/994E84A6-F67D-4019-950C-CE8573EC1677-1024x768.jpg",
    introImage: "/uploads/2023/06/B2732E2E-9D56-43F7-93B4-F4EACB80A14F-1024x768.jpg",
    faq: [1, 4, 3],
  },
  housing: {
    title: "住宅設備",
    description: "沖縄県内の住宅設備工事（レンジフード・浴室換気乾燥機の取替）、オール電化・IH工事、家電の販売・配達設置まで。住まいの電気・空調設備のお困りごとは沖空電へ。",
    catch: "沖縄の暮らしに\n安心と快適を。",
    heroImage: "/uploads/2025/01/B1DEC9DF-43E4-4DD1-8CA6-B3ED32BE2738-1024x768.jpg",
    introImage: "/uploads/2026/07/LINE_NOTE_260707_3-1024x473.jpg",
    faq: [1, 7, 3],
  },
  business: {
    title: "法人・店舗向けサービス",
    description: "事務所・店舗・医院・マンション共用部など法人様向けの電気・空調設備工事。業務用エアコンの設置・取替・修理・クリーニング、照明設備工事まで沖縄県内でワンストップ対応。",
    catch: "ビジネスの現場を、\n電気と空調で支えます。",
    heroImage: "/uploads/2024/04/6AE3864A-E305-4FBE-8094-8F677ECF87A9-768x1024.jpg",
    introImage: "/uploads/2024/04/E324290E-8CC3-47FB-B79D-6EFDBA00CA38-768x1024.jpg",
    faq: [5, 4, 1],
  },
};

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/service/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const m = META[slug];
  if (!m) return {};
  return { title: m.title, description: m.description, alternates: { canonical: `/service/${slug}/` } };
}

export default async function ServiceDetail({ params }: PageProps<"/service/[slug]">) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  const m = META[slug];
  if (!service || !m) notFound();

  const related = worksByCategory(service.slug).slice(0, 6);
  // 写真ギャラリー：既存サイト「沖空電のしごと」の写真、なければ施工事例の写真
  const photos =
    service.galleryHeadings.length > 0
      ? service.galleryHeadings.flatMap((h) => gallery.find((g) => g.heading === h)?.images ?? []).map((p) => p.src)
      : related.map((w) => w.thumbnail).filter((x): x is string => !!x);
  const faqs = m.faq.map((i) => FAQS[i]);

  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: m.title,
    serviceType: service.title,
    description: m.description,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "State", name: "沖縄県" },
    url: `${SITE_URL}/service/${slug}/`,
  };

  return (
    <>
      <PageHero en="SERVICE" title={m.title} lead={service.lead} image={m.heroImage} catch={m.catch} />
      <Breadcrumb items={[{ href: "/service/", label: "サービス" }, { label: m.title }]} />

      <section className="section section--pale">
        <div className="container">
          <div className="sd-intro">
            <div className="sd-intro__img">
              <Image src={m.introImage} alt={service.title} fill sizes="(max-width: 900px) 100vw, 520px" />
            </div>
            <div className="sd-intro__body">
              <SubTitle en="ABOUT" title={`沖空電の${m.title}`} />
              <p>{service.body}</p>
              <h3 className="sd-intro__h3">主な対応工事</h3>
              <ul className="checklist checklist--box">
                {service.items.map((it) => (
                  <li key={it}>
                    <Icon name="check" size={16} />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {photos.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionTitle title="施工写真" lead="これまでに手がけた工事の写真をご紹介します。" />
            {service.galleryHeadings.length > 0 ? (
              service.galleryHeadings.map((h) => {
                const g = gallery.find((x) => x.heading === h);
                if (!g) return null;
                return (
                  <div key={h} className="photo-group">
                    <h3 className="bar-title bar-title--sm">{h}</h3>
                    <div className="photo-grid">
                      {g.images.map((p, i) => (
                        <div key={p.src + i} className="photo-grid__item">
                          <Image src={p.src} alt={`${h}の施工写真${i + 1}`} fill sizes="(max-width: 640px) 50vw, 280px" />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="photo-grid">
                {photos.map((src, i) => (
                  <div key={src + i} className="photo-grid__item">
                    <Image src={src} alt={`${m.title}の施工写真${i + 1}`} fill sizes="(max-width: 640px) 50vw, 280px" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="section section--sky">
        <div className="container">
          <SectionTitle title="ご依頼の流れ" lead="お問い合わせから施工完了まで、丁寧にご案内いたします。" />
          <ol className="flow">
            {[
              { t: "お問い合わせ", d: `お電話（${COMPANY.tel}）またはフォームよりご連絡ください。` },
              { t: "現地調査", d: "担当者が現場を確認し、最適なプランをご提案します。" },
              { t: "お見積もり", d: "現地調査・お見積もりは無料。内容にご納得いただいてからのご契約です。" },
              { t: "施工", d: "専門技術者が安全・丁寧に施工いたします。" },
              { t: "完了・アフターフォロー", d: "施工後も気になる点があればお気軽にご相談ください。" },
            ].map((f, i) => (
              <li key={f.t} className="flow__item">
                <span className="flow__no">STEP {String(i + 1).padStart(2, "0")}</span>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section section--pale">
          <div className="container">
            <SectionTitle title={`${service.title}の施工事例`} />
            <div className="wgrid">
              {related.map((w) => (
                <WorkCard key={w.id} work={w} />
              ))}
            </div>
            <div className="center mt-40">
              <MoreButton href={`/works/category/${service.slug}/`}>{service.title}の施工事例をもっと見る</MoreButton>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container container--narrow">
          <SectionTitle title="よくある質問" />
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q} className="faq__item">
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
          <div className="center mt-40">
            <MoreButton href="/faq/">よくある質問をもっと見る</MoreButton>
          </div>
        </div>
      </section>

      <nav className="section section--pale pt-0 svc-other" aria-label="その他のサービス">
        <div className="container">
          <h2 className="bar-title bar-title--sm">その他のサービス</h2>
          <ul className="svc-links">
            {SERVICES.filter((s) => s.slug !== slug).map((s) => (
              <li key={s.slug}>
                <Link href={`/service/${s.slug}/`}>
                  <Icon name={s.icon} size={22} />
                  {META[s.slug].title}
                  <Icon name="arrow" size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <CtaBand />
      <JsonLd data={ld} />
    </>
  );
}
