import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = { title: "ページが見つかりません", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="section section--pale notfound">
      <div className="container center">
        <p className="notfound__code">404</p>
        <h1 className="notfound__title">お探しのページが見つかりませんでした</h1>
        <p>
          ページが移動または削除された可能性があります。
          <br />
          ホームページをリニューアルしましたので、下記よりお探しください。
        </p>
        <div className="notfound__links">
          <Link href="/" className="btn btn--navy">
            トップページへ <Icon name="arrow" size={16} />
          </Link>
          <Link href="/works/" className="btn btn--outline">
            施工事例を見る <Icon name="arrow" size={16} />
          </Link>
          <Link href="/contact/" className="btn btn--outline">
            お問い合わせ <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
