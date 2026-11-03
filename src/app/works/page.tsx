import type { Metadata } from "next";
import WorksIndex from "./WorksIndex";

export const metadata: Metadata = {
  title: "施工事例",
  description: "沖空電の施工事例一覧。那覇市・浦添市・沖縄市・北谷町など沖縄県内で手がけたエアコン取替・業務用エアコン・電気設備・照明・住宅設備工事の実例を写真付きでご紹介します。",
  alternates: { canonical: "/works/" },
};

export default function WorksPage() {
  return <WorksIndex page={1} />;
}
