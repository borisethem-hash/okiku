import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Zen_Kurenaido } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCta from "@/components/MobileCta";
import Reveal from "@/components/Reveal";
import { JsonLd } from "@/components/Parts";
import { COMPANY, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import "./globals.css";

const noto = Noto_Sans_JP({
  variable: "--font-noto",
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const hand = Zen_Kurenaido({
  variable: "--font-hand",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "株式会社沖空電｜沖縄の電気工事・エアコン工事・空調設備工事",
    template: "%s｜株式会社沖空電（沖縄県南城市）",
  },
  description: SITE_DESCRIPTION,
  keywords: ["沖空電", "OKD", "沖縄", "南城市", "那覇市", "エアコン工事", "空調設備工事", "電気工事", "業務用エアコン", "エアコンクリーニング", "住宅設備"],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: COMPANY.name,
    images: [{ url: "/uploads/2023/05/slide1.jpg", width: 2240, height: 1000, alt: COMPANY.name }],
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: [{ url: "/uploads/2023/05/cropped-favicon-192x192.png", sizes: "192x192", type: "image/png" }],
    apple: "/uploads/2023/05/cropped-favicon-180x180.png",
  },
  formatDetection: { telephone: false },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b2d6b",
  width: "device-width",
  initialScale: 1,
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  "@id": `${SITE_URL}/#organization`,
  name: COMPANY.name,
  alternateName: [COMPANY.nameEn, "OKD", "沖空電"],
  url: SITE_URL,
  logo: `${SITE_URL}/uploads/2023/05/cropped-favicon-192x192.png`,
  image: `${SITE_URL}/uploads/2023/05/slide1.jpg`,
  description: SITE_DESCRIPTION,
  telephone: "+81-98-988-9953",
  faxNumber: "+81-98-988-9954",
  foundingDate: "2022-01-26",
  address: {
    "@type": "PostalAddress",
    postalCode: COMPANY.zip,
    addressRegion: "沖縄県",
    addressLocality: "南城市",
    streetAddress: "佐敷津波古1232番地1",
    addressCountry: "JP",
  },
  geo: { "@type": "GeoCoordinates", latitude: COMPANY.geo.lat, longitude: COMPANY.geo.lng },
  areaServed: { "@type": "State", name: "沖縄県" },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
  ],
  sameAs: [COMPANY.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${noto.variable} ${hand.variable}`} suppressHydrationWarning>
      <head>
        {/* スクロール表示アニメーション用。JS が動かない場合は 3 秒後に通常表示へ戻す */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(d){d.classList.add('js');setTimeout(function(){if(!d.classList.contains('reveal-ready'))d.classList.remove('js')},3000)})(document.documentElement)",
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip">
          本文へスキップ
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCta />
        <Reveal />
        <JsonLd data={orgLd} />
      </body>
    </html>
  );
}
