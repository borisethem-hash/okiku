"use client";

import Icon from "./Icon";

export default function PageTop() {
  return (
    <button
      type="button"
      className="pagetop"
      aria-label="ページの先頭へ戻る"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <Icon name="up" size={20} />
    </button>
  );
}
