import type { Metadata } from "next";
import NewsIndex from "./NewsIndex";

export const metadata: Metadata = {
  title: "お知らせ",
  description: "株式会社沖空電からのお知らせ一覧。省エネ家電キャンペーン情報や営業のご案内など最新情報をお届けします。",
  alternates: { canonical: "/news/" },
};

export default function NewsPage() {
  return <NewsIndex page={1} />;
}
