"use client";

import { useEffect } from "react";

// スクロールで表示するアニメーションの対象
const TARGETS = [
  ".stitle",
  ".subtitle",
  ".bar-title",
  ".svc-card",
  ".wmini",
  ".svc5__card",
  ".svc-row",
  ".flow__item",
  ".wcard",
  ".nlist__item",
  ".reason3__item",
  ".reason5__card",
  ".stats li",
  ".area__region",
  ".faq__item",
  ".method",
  ".cfaq",
  ".svc-links a",
  ".topnews__visual",
  ".message__visual",
  ".overview__photo",
  ".photo-grid__item",
].join(",");

// 拡大しながら表示するもの
const ZOOM = ".topnews__visual, .message__visual, .overview__photo, .photo-grid__item";

export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");
    if (!("IntersectionObserver" in window)) {
      root.classList.remove("js");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
        if (el.dataset.reveal !== undefined || el.closest(".spnav")) return;
        el.dataset.reveal = el.matches(ZOOM) ? "zoom" : "";
        // 同じ並びのカードは少しずつ遅らせる
        const idx = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
        el.style.setProperty("--rd", `${(idx % 4) * 0.1}s`);
        io.observe(el);
      });
    };

    scan();
    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    mo.observe(document.getElementById("main") ?? document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
