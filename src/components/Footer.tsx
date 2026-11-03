import Link from "next/link";
import { COMPANY, SERVICES } from "@/lib/site";
import Icon from "./Icon";
import { Logo } from "./Header";
import PageTop from "./PageTop";

const COLS = [
  {
    title: "サービス",
    href: "/service/",
    links: SERVICES.map((s) => ({ href: `/service/${s.slug}/`, label: s.title })),
  },
  { title: "施工事例", href: "/works/", links: [{ href: "/works/", label: "施工事例一覧" }] },
  {
    title: "選ばれる理由",
    href: "/reason/",
    links: [
      { href: "/reason/", label: "沖空電の強み" },
      { href: "/area/", label: "対応エリア" },
      { href: "/faq/", label: "よくある質問" },
    ],
  },
  {
    title: "会社案内",
    href: "/company/",
    links: [
      { href: "/company/#overview", label: "会社概要" },
      { href: "/news/", label: "お知らせ" },
    ],
  },
  {
    title: "お問合せ",
    href: "/contact/",
    links: [
      { href: "/contact/#form", label: "お問合せフォーム" },
      { href: "/privacy-policy/", label: "プライバシーポリシー" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__info">
          <Link href="/" aria-label="株式会社沖空電 トップページ">
            <Logo light />
          </Link>
          <ul>
            <li>
              <Icon name="pin" size={18} />
              <span>
                〒{COMPANY.zip}
                <span className="footer__addr">{COMPANY.address}</span>
              </span>
            </li>
            <li className="footer__tel">
              <Icon name="phone" size={18} />
              <a href={COMPANY.telLink}>{COMPANY.tel}</a>
            </li>
            <li>
              <Icon name="clock" size={18} />
              受付時間 {COMPANY.hours}（平日）
            </li>
            <li>
              <Icon name="instagram" size={18} />
              <a href={COMPANY.instagram} target="_blank" rel="noopener noreferrer">
                Instagram @{COMPANY.instagramId}
              </a>
            </li>
          </ul>
        </div>
        <nav className="footer__nav" aria-label="フッターナビゲーション">
          {COLS.map((c) => (
            <div key={c.title} className="footer__col">
              <p className="footer__col-title">
                <Link href={c.href}>{c.title}</Link>
              </p>
              <ul>
                {c.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="container footer__bottom">
        <small>© 2023 {COMPANY.name} All Rights Reserved.</small>
        <div className="footer__bottom-links">
          <Link href="/privacy-policy/">プライバシーポリシー</Link>
          <Link href="/sitemap.xml" prefetch={false}>
            サイトマップ
          </Link>
          <PageTop />
        </div>
      </div>
    </footer>
  );
}
