"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  { src: "/uploads/2023/05/slide1.jpg", pos: "70% center" },
  { src: "/uploads/2023/05/slide2.jpg", pos: "65% center" },
  { src: "/uploads/2023/05/slide4.jpg", pos: "center" },
  { src: "/uploads/2023/05/slide3.jpg", pos: "45% center" },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 6000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="hero__slides">
      {SLIDES.map((s, i) => (
        <div key={s.src} className={`hero__slide${i === index ? " is-active" : ""}`} aria-hidden={i !== index}>
          <Image src={s.src} alt="" fill priority={i === 0} sizes="(max-width: 900px) 100vw, 70vw" style={{ objectFit: "cover", objectPosition: s.pos }} />
        </div>
      ))}
      <div className="hero__dots">
        {SLIDES.map((s, i) => (
          <button key={s.src} type="button" className={i === index ? "is-active" : undefined} aria-label={`スライド${i + 1}を表示`} onClick={() => setIndex(i)} />
        ))}
      </div>
    </div>
  );
}
