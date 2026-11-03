import Link from "next/link";
import { COMPANY } from "@/lib/site";
import Icon from "./Icon";

/** スマートフォン下部固定CTA */
export default function MobileCta() {
  return (
    <div className="mcta" role="complementary" aria-label="お問い合わせ">
      <a href={COMPANY.telLink} className="mcta__tel">
        <Icon name="phone" size={20} />
        <span>
          電話で相談<small>{COMPANY.hours}</small>
        </span>
      </a>
      <Link href="/contact/#form" className="mcta__mail">
        <Icon name="mail" size={20} />
        <span>
          無料見積もり<small>24時間受付</small>
        </span>
      </Link>
    </div>
  );
}
