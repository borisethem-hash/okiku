"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { COMPANY, NAV, SUB_NAV, SERVICES } from "@/lib/site";
import Icon from "./Icon";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`logo${light ? " logo--light" : ""}`}>
      <span className="logo__mark">
        <Image src="/logo-mark.png" alt="OKD" width={139} height={73} priority />
      </span>
      <span className="logo__text">
        <small>株式会社</small>沖空電
      </span>
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ページ遷移でメニューを閉じる
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header__inner">
        <Link href="/" className="header__logo" aria-label="株式会社沖空電 トップページ">
          <Logo />
        </Link>

        <nav className="gnav" aria-label="グローバルナビゲーション">
          <ul>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={isActive(n.href) ? "is-active" : undefined} aria-current={isActive(n.href) ? "page" : undefined}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a href={COMPANY.telLink} className="header__tel">
          <Icon name="phone" size={22} />
          <span>
            <strong>{COMPANY.tel}</strong>
            <small>受付時間 {COMPANY.hours}</small>
          </span>
        </a>

        <button
          type="button"
          className={`burger${open ? " is-open" : ""}`}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="spnav"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
          <em>{open ? "CLOSE" : "MENU"}</em>
        </button>
      </div>

      <div id="spnav" className={`spnav${open ? " is-open" : ""}`} inert={!open}>
        <nav aria-label="スマートフォンメニュー">
          <ul className="spnav__main">
            <li>
              <Link href="/">トップページ</Link>
            </li>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
                {n.href === "/service/" && (
                  <ul className="spnav__sub">
                    {SERVICES.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/service/${s.slug}/`}>{s.short}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            {SUB_NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href}>{n.label}</Link>
              </li>
            ))}
          </ul>
          <a href={COMPANY.telLink} className="btn btn--yellow btn--block">
            <Icon name="phone" size={20} /> {COMPANY.tel}
          </a>
          <p className="spnav__hours">受付時間 {COMPANY.hours}（{COMPANY.holiday}を除く）</p>
          <Link href="/contact/#form" className="btn btn--navy btn--block">
            <Icon name="mail" size={20} /> メールでのお問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  );
}
