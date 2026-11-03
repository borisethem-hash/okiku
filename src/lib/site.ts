export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://okiku-den.co.jp").replace(/\/$/, "");

export const COMPANY = {
  name: "株式会社沖空電",
  nameShort: "沖空電",
  nameEn: "OKD.Co.,Ltd",
  ceo: "親川 賢次",
  established: "2022年1月26日",
  capital: "300万円",
  zip: "901-1414",
  address: "沖縄県南城市佐敷津波古1232番地1",
  tel: "098-988-9953",
  telLink: "tel:0989889953",
  fax: "098-988-9954",
  hours: "8:00〜17:00",
  holiday: "土曜・日曜・祝日",
  license: "沖縄県知事許可（般−4）第14646号　電気工事業／管工事業",
  electricLicense: "沖縄県知事許可　第22E29961号",
  instagram: "https://www.instagram.com/okikuuden/",
  instagramId: "okikuuden",
  businesses: [
    "空調設備工事",
    "一般電気工事",
    "住宅設備工事",
    "各種家電住設販売",
    "オール電化工事",
    "太陽光発電工事",
    "家電配達設置工事",
    "BS、CS放送、地上デジタル放送システム",
    "電気自動車用充電スタンド",
  ],
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.327358149875!2d127.7741246!3d26.1860273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34e56e6454fc6ef1%3A0x9a394fb7c7143f7b!2z44CSOTAxLTE0MTQg5rKW57iE55yM5Y2X5Z-O5biC5L2Q5pW35rSl5rOi5Y-k77yR77yS77yT77yS4oiS77yR!5e0!3m2!1sja!2sjp!4v1683507723890!5m2!1sja!2sjp",
  mapLink: "https://www.google.com/maps/search/?api=1&query=%E6%B2%96%E7%B8%84%E7%9C%8C%E5%8D%97%E5%9F%8E%E5%B8%82%E4%BD%90%E6%95%B7%E6%B4%A5%E6%B3%A2%E5%8F%A41232-1",
  geo: { lat: 26.1860273, lng: 127.7741246 },
} as const;

export const SITE_DESCRIPTION =
  "沖縄県南城市の株式会社沖空電（OKD）は、家庭用・業務用エアコン工事、一般電気工事、住宅設備工事を沖縄県内各地で手がける電気・空調設備の専門会社です。現地調査・お見積もりは無料。お気軽にご相談ください。";

export const NAV = [
  { href: "/service/", label: "サービス" },
  { href: "/works/", label: "施工事例" },
  { href: "/reason/", label: "選ばれる理由" },
  { href: "/company/", label: "会社案内" },
  { href: "/contact/", label: "お問合せ" },
] as const;

export const SUB_NAV = [
  { href: "/news/", label: "お知らせ" },
  { href: "/area/", label: "対応エリア" },
  { href: "/faq/", label: "よくある質問" },
] as const;

export type IconName =
  | "bolt" | "snow" | "building" | "house" | "wrench" | "pin" | "shield" | "clock"
  | "phone" | "mail" | "arrow" | "check" | "chevron" | "calendar" | "hand" | "bulb"
  | "users" | "helmet" | "doc" | "question" | "send" | "instagram" | "map" | "menu" | "close" | "up";

export type ServiceSlug = "electric" | "aircon" | "business" | "housing";

export type Service = {
  slug: ServiceSlug;
  title: string;
  short: string;
  icon: IconName;
  image: string;
  lead: string;
  body: string;
  items: string[];
  galleryHeadings: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "electric",
    title: "電気設備工事",
    short: "電気工事",
    icon: "bolt",
    image: "/uploads/2023/05/2-1.jpg",
    lead: "住宅・店舗・施設などの電気設備工事を行います。",
    body: "一般住宅から店舗・事務所・マンションまで、幅広い電気設備工事に対応しています。分電盤・配線工事から照明設備、電気自動車用充電設備、太陽光発電、アンテナ工事まで、安全で快適な電気環境をご提供します。",
    items: ["一般電気工事・分電盤工事", "照明設備工事（LED化対応）", "電気自動車用充電スタンド・コンセント設置", "太陽光発電工事", "BS、CS放送、地上デジタル放送システム", "防犯カメラ工事"],
    galleryHeadings: ["一般電気工事", "電気自動車用充電スタンド", "太陽光発電工事", "BS、CS放送、地上デジタル放送システム"],
  },
  {
    slug: "aircon",
    title: "空調設備工事",
    short: "空調・エアコン工事",
    icon: "snow",
    image: "/uploads/2023/05/1-12.jpg",
    lead: "快適な空間をつくる空調設備の設計・施工を行います。",
    body: "家庭用ルームエアコンから業務用エアコン（天井カセット形など）まで、新設・取替・修理・クリーニングに幅広く対応。高温多湿な沖縄の暮らしに欠かせない空調を、確かな技術でお届けします。",
    items: ["ルームエアコン新設・取替工事", "業務用エアコン設置・更新", "換気設備工事", "エアコン修理・クリーニング", "業務用エアコン（第一種特定製品）簡易点検"],
    galleryHeadings: ["空調設備工事"],
  },
  {
    slug: "business",
    title: "法人・店舗向け",
    short: "法人・店舗向けサービス",
    icon: "building",
    image: "/uploads/2023/05/work.jpg",
    lead: "オフィス・店舗などの電気・空調設備をトータルでサポートします。",
    body: "事務所・店舗・医院・マンション共用部など、ビジネスシーンに最適な電気・空調設備をご提案。新築・改装時の設備工事から、業務用エアコンの取替・修理・定期的なクリーニングまでワンストップで対応します。",
    items: ["事務所・店舗の電気設備工事", "業務用エアコン設置・取替・撤去", "照明設備工事・間接照明", "業務用エアコン修理・クリーニング", "マンション共用部・管理人室の設備工事"],
    galleryHeadings: [],
  },
  {
    slug: "housing",
    title: "住宅向け工事",
    short: "住宅設備",
    icon: "house",
    image: "/uploads/2023/05/line_36610445174412.jpg",
    lead: "一般住宅の電気・空調工事で快適な住まいを実現します。",
    body: "新築・リフォーム・修理など、住まいの電気・空調・住宅設備をしっかりサポート。オール電化やIHクッキングヒーター、レンジフード・浴室換気乾燥機の取替、家電の販売・配達設置まで、暮らしの「困った」に対応します。",
    items: ["住宅設備工事（レンジフード・換気扇など）", "オール電化工事・IHクッキングヒーター", "浴室乾燥・暖房・換気設備の取替", "各種家電住設販売", "家電配達設置工事"],
    galleryHeadings: ["住宅設備工事", "オール電化工事", "各種家電住設販売", "家電配達設置工事"],
  },
];

export const WORK_CATEGORIES: { slug: ServiceSlug; label: string; icon: IconName }[] = [
  { slug: "electric", label: "電気設備工事", icon: "bolt" },
  { slug: "aircon", label: "空調設備工事", icon: "snow" },
  { slug: "business", label: "法人・店舗向け", icon: "building" },
  { slug: "housing", label: "住宅向け工事", icon: "house" },
];

export const REASONS = [
  {
    no: "01",
    icon: "helmet" as IconName,
    title: "確かな技術力と\n豊富な経験",
    short: "確かな技術力",
    text: "電気工事・空調設備工事の専門技術者が在籍。電気工事業・管工事業の建設業許可を取得し、家庭用から業務用まであらゆる現場に対応します。",
    image: "/uploads/2023/05/2-3.jpg",
  },
  {
    no: "02",
    icon: "shield" as IconName,
    title: "安心・安全の\n施工品質",
    short: "安心の品質管理",
    text: "法令・規格を遵守した安全管理と、丁寧な養生・後片付けを徹底。施工前後の写真記録で、安心できる施工をお約束します。",
    image: "/uploads/2023/05/1-11.jpg",
  },
  {
    no: "03",
    icon: "pin" as IconName,
    title: "地域密着の\nスピード対応",
    short: "地域密着の対応",
    text: "沖縄に根ざした企業として、沖縄県内各地を『日々全力！』で駆け回っています。些細なお困りごとでもお気軽にどうぞ。",
    image: "/uploads/2023/05/slide4.jpg",
  },
  {
    no: "04",
    icon: "bulb" as IconName,
    title: "幅広い対応力",
    short: "幅広い対応力",
    text: "空調・電気工事はもちろん、太陽光発電、オール電化、EV充電設備、アンテナ、家電の販売・設置までワンストップで対応可能です。",
    image: "/uploads/2023/05/line_24906195910809.jpg",
  },
  {
    no: "05",
    icon: "users" as IconName,
    title: "お客様第一の\n丁寧な対応",
    short: "お客様第一の姿勢",
    text: "お問い合わせから施工後のアフターフォローまで、誠実で丁寧な対応を心がけ、長くお付き合いいただける関係を築きます。",
    image: "/uploads/2025/01/img-50d8429044.jpg",
  },
];

export const FAQS = [
  {
    q: "対応エリアを教えてください。",
    a: "南城市の本社を拠点に、那覇市・浦添市・沖縄市・北谷町・与那原町など沖縄県内各地で施工しております。エリア外の場合もまずはお気軽にご相談ください。",
  },
  {
    q: "見積りは無料ですか？",
    a: "はい、現地調査・お見積もりは無料です。お電話またはお問い合わせフォームよりお気軽にご依頼ください。",
  },
  {
    q: "支払い方法はどのようになりますか？",
    a: "お支払い方法は工事の内容・規模により異なります。お見積もりの際に担当者よりご案内いたしますので、ご希望がございましたらお申し付けください。",
  },
  {
    q: "工事の際、どのくらいの期間がかかりますか？",
    a: "ルームエアコンの取替であれば通常1日で完了します。業務用エアコンや電気設備工事など規模の大きな工事は、現地調査のうえ工期をご案内いたします。",
  },
  {
    q: "緊急のトラブルにも対応していますか？",
    a: "エアコンの故障や電気のトラブルなど、急なご相談にもできる限りスピーディーに対応いたします。まずはお電話（098-988-9953）でご連絡ください。",
  },
  {
    q: "法人・店舗の工事もお願いできますか？",
    a: "はい、事務所・店舗・医院・マンション共用部など、法人様の電気・空調設備工事にも多数の実績がございます。業務用エアコンの点検・クリーニングもお任せください。",
  },
  {
    q: "エアコンクリーニングだけでもお願いできますか？",
    a: "はい、家庭用・業務用ともにエアコンクリーニングのみのご依頼も承っております。普段見えない内部の汚れまでしっかり洗浄いたします。",
  },
  {
    q: "エアコンや家電の購入もできますか？",
    a: "はい、各種家電・住設機器の販売から配達・設置工事まで一貫して対応いたします。省エネ家電のキャンペーン情報もお知らせでご紹介しています。",
  },
];

export const AREAS = {
  south: ["南城市", "那覇市", "豊見城市", "糸満市", "与那原町", "南風原町", "八重瀬町", "西原町"],
  middle: ["浦添市", "宜野湾市", "沖縄市", "うるま市", "北谷町", "北中城村", "中城村", "嘉手納町", "読谷村"],
};
