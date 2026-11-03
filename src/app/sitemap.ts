import type { MetadataRoute } from "next";
import { SITE_URL, SERVICES, WORK_CATEGORIES } from "@/lib/site";
import { works, news } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = [works[0]?.modified, news[0]?.modified].filter(Boolean).sort().pop();
  const fixed: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1, lastModified: latest },
    { url: `${SITE_URL}/service/`, changeFrequency: "monthly", priority: 0.9 },
    ...SERVICES.map((s) => ({ url: `${SITE_URL}/service/${s.slug}/`, changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: `${SITE_URL}/works/`, changeFrequency: "weekly", priority: 0.8, lastModified: works[0]?.modified },
    ...WORK_CATEGORIES.map((c) => ({ url: `${SITE_URL}/works/category/${c.slug}/`, changeFrequency: "weekly" as const, priority: 0.6 })),
    { url: `${SITE_URL}/reason/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/company/`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/area/`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/faq/`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact/`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/news/`, changeFrequency: "weekly", priority: 0.6, lastModified: news[0]?.modified },
    { url: `${SITE_URL}/privacy-policy/`, changeFrequency: "yearly", priority: 0.2 },
  ];
  return [
    ...fixed,
    ...works.map((w) => ({ url: `${SITE_URL}/works/${w.id}/`, lastModified: w.modified, changeFrequency: "yearly" as const, priority: 0.5 })),
    ...news.map((n) => ({ url: `${SITE_URL}/news/${n.id}/`, lastModified: n.modified, changeFrequency: "yearly" as const, priority: 0.4 })),
  ];
}
