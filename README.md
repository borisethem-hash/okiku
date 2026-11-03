# 株式会社沖空電 コーポレートサイト（Next.js）

既存サイト https://okiku-den.co.jp/ のリニューアル版です。
デザイン案（自社サイトデザイン案.pdf）の配色・レイアウトに、既存サイトの実際のテキスト・画像を組み込んでいます。

## 起動

```bash
npm install
npm run dev        # 開発 http://localhost:3000
npm run build      # 本番ビルド
npm run start      # 本番起動
```

Node.js 20 以上。

## ページ構成

| URL | 内容 |
| --- | --- |
| `/` | トップページ |
| `/service/` | サービス紹介 |
| `/service/aircon/` `/service/electric/` `/service/housing/` `/service/business/` | 空調・エアコン工事／電気工事／住宅設備／法人・店舗向け |
| `/works/` `/works/category/{cat}/` `/works/{id}/` | 施工事例 一覧・カテゴリー別・詳細（9件ごとにページ送り） |
| `/news/` `/news/{id}/` | お知らせ 一覧・詳細 |
| `/reason/` `/company/` `/area/` `/faq/` `/contact/` `/privacy-policy/` | 選ばれる理由／会社案内／対応エリア／よくある質問／お問い合わせ／プライバシーポリシー |
| `/sitemap.xml` `/robots.txt` | 自動生成 |

## コンテンツの更新

- 会社情報・サービス内容・FAQ・対応エリア： `src/lib/site.ts`
- 施工事例・お知らせ： `src/data/works.json` / `src/data/news.json`
- 画像： `public/uploads/`

### 旧サイトからの再取り込み

```bash
node scripts/import-wp.mjs
```

旧 WordPress の REST API から投稿を取得し、施工事例／お知らせへの振り分け、施工カテゴリー・施工場所の推定、画像のダウンロード（`public/uploads/`）、旧URL→新URLのリダイレクト表（`src/data/redirects.json`）の生成を行います。
自動分類なので、必要に応じて JSON の `category`（electric / aircon / business / housing）や `location` を手で修正してください。

## お問い合わせフォーム

`.env.local` に SMTP を設定すると、管理者宛てメールと自動返信メールを送信します。

```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=info@okiku-den.co.jp
SMTP_PASS=********
MAIL_FROM="沖空電 <info@okiku-den.co.jp>"
MAIL_TO=info@okiku-den.co.jp
NEXT_PUBLIC_SITE_URL=https://okiku-den.co.jp
```

未設定の場合、送信内容はサーバーログに出力されるだけです（開発用）。
スパム対策としてハニーポット・入力検証（クライアント／サーバー両方）・簡易レート制限を実装しています。

## SEO

- ページごとの title / description / canonical / OGP
- 構造化データ：Electrician（LocalBusiness）・BreadcrumbList・Service・Article・FAQPage
- sitemap.xml / robots.txt 自動生成
- 旧URL（日本語スラッグの投稿、`/work/`、`/instagram/`、`/?p=ID` など）は新URLへ 301 リダイレクト（`src/proxy.ts`、`next.config.ts`）
- 末尾スラッシュ付きURLは旧サイトと同じ形式
