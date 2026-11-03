import worksData from "@/data/works.json";
import newsData from "@/data/news.json";
import galleryData from "@/data/gallery.json";
import { WORK_CATEGORIES, type ServiceSlug } from "./site";

export type Work = {
  id: number;
  date: string;
  modified: string;
  title: string;
  excerpt: string;
  thumbnail: string | null;
  content: string;
  category: ServiceSlug;
  location: string;
};

export type News = {
  id: number;
  date: string;
  modified: string;
  title: string;
  excerpt: string;
  thumbnail: string | null;
  content: string;
  label: string;
};

export type GallerySection = { heading: string; images: { src: string; width: number; height: number }[] };

const byDateDesc = <T extends { date: string }>(a: T, b: T) => b.date.localeCompare(a.date);

export const works = (worksData as Work[]).slice().sort(byDateDesc);
export const news = (newsData as News[]).slice().sort(byDateDesc);
export const gallery = galleryData as GallerySection[];

export const WORKS_PER_PAGE = 9;
export const NEWS_PER_PAGE = 10;

export function getWork(id: number) {
  return works.find((w) => w.id === id);
}
export function getNews(id: number) {
  return news.find((n) => n.id === id);
}

export function worksByCategory(cat?: ServiceSlug) {
  return cat ? works.filter((w) => w.category === cat) : works;
}

export function paginate<T>(list: T[], page: number, per: number) {
  const totalPages = Math.max(1, Math.ceil(list.length / per));
  return { items: list.slice((page - 1) * per, page * per), totalPages };
}

export function categoryInfo(slug: string) {
  return WORK_CATEGORIES.find((c) => c.slug === slug);
}

/** 施工事例・お知らせを統合した新着情報（トップページ用） */
export function latestUpdates(limit: number) {
  const items = [
    ...works.map((w) => ({ id: w.id, date: w.date, title: w.title, label: "施工事例", href: `/works/${w.id}/` })),
    ...news.map((n) => ({ id: n.id, date: n.date, title: n.title, label: "お知らせ", href: `/news/${n.id}/` })),
  ];
  return items.sort(byDateDesc).slice(0, limit);
}

export const formatDate = (d: string) => d.replaceAll("-", ".");

export function excerptOf(text: string, len = 60) {
  const t = text.trim();
  return t.length > len ? t.slice(0, len) + "…" : t;
}
