import nodemailer from "nodemailer";
import { COMPANY } from "@/lib/site";

/**
 * お問い合わせフォーム送信API
 *
 * 環境変数（.env.local）でSMTPを設定するとメール送信されます。
 *   SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS / SMTP_SECURE("true"|"false")
 *   MAIL_FROM   送信元アドレス（例: "沖空電 <info@okiku-den.co.jp>"）
 *   MAIL_TO     受信先アドレス（社内の受付アドレス）
 * 未設定の場合は送信内容をサーバーログに出力します（開発用）。
 */

const TYPES = new Set([
  "お見積もり依頼",
  "エアコン工事（取付・取替）",
  "業務用エアコン・空調設備",
  "エアコン修理・クリーニング",
  "電気工事・照明工事",
  "住宅設備工事",
  "法人・店舗の工事",
  "その他",
]);

// 簡易レート制限（同一IPから1分間に5回まで）
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, message: "短時間に送信が集中しています。しばらくしてから再度お試しください。" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, message: "不正なリクエストです。" }, { status: 400 });
  }

  // ハニーポットに入力があればボットとみなし、成功を装って破棄
  if (str(body.website, 200)) return Response.json({ ok: true });

  const data = {
    name: oneLine(str(body.name, 100)),
    company: oneLine(str(body.company, 100)),
    email: oneLine(str(body.email, 200)),
    tel: oneLine(str(body.tel, 30)),
    type: str(body.type, 50),
    message: str(body.message, 3000),
    agree: body.agree === true,
  };

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "お名前を入力してください。";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "メールアドレスの形式が正しくありません。";
  if (!/^[0-9０-９\-－()（）+\s]{10,16}$/.test(data.tel)) errors.tel = "電話番号の形式が正しくありません。";
  if (!TYPES.has(data.type)) errors.type = "お問い合わせの種類を選択してください。";
  if (!data.message) errors.message = "お問い合わせ内容を入力してください。";
  if (!data.agree) errors.agree = "プライバシーポリシーへの同意が必要です。";
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, message: "入力内容をご確認ください。", errors }, { status: 422 });
  }

  const text = [
    "ホームページよりお問い合わせがありました。",
    "",
    `■お名前：${data.name}`,
    `■会社名：${data.company || "-"}`,
    `■メールアドレス：${data.email}`,
    `■電話番号：${data.tel}`,
    `■お問い合わせの種類：${data.type}`,
    "■お問い合わせ内容：",
    data.message,
    "",
    "--",
    `送信日時：${new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}`,
  ].join("\n");

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, MAIL_FROM, MAIL_TO } = process.env;

  if (!SMTP_HOST || !MAIL_TO) {
    console.info("[contact] SMTP未設定のためログ出力のみ:\n" + text);
    return Response.json({ ok: true });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT || 587),
      secure: SMTP_SECURE === "true",
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    });
    const from = MAIL_FROM || SMTP_USER || MAIL_TO;

    // 管理者宛て
    await transporter.sendMail({
      from,
      to: MAIL_TO,
      replyTo: data.email,
      subject: `【HPお問い合わせ】${data.type}（${data.name}様）`,
      text,
    });

    // 自動返信
    await transporter.sendMail({
      from,
      to: data.email,
      subject: `【${COMPANY.name}】お問い合わせありがとうございます`,
      text: [
        `${data.name} 様`,
        "",
        `この度は${COMPANY.name}へお問い合わせいただき、誠にありがとうございます。`,
        "以下の内容で受け付けいたしました。担当者より折り返しご連絡いたします。",
        "",
        text.split("\n").slice(2, -3).join("\n"),
        "",
        "──────────────────",
        COMPANY.name,
        `〒${COMPANY.zip} ${COMPANY.address}`,
        `TEL：${COMPANY.tel}（受付時間 ${COMPANY.hours}）`,
        `FAX：${COMPANY.fax}`,
        "──────────────────",
      ].join("\n"),
    });

    return Response.json({ ok: true });
  } catch (e) {
    console.error("[contact] mail send failed", e);
    return Response.json(
      { ok: false, message: `送信に失敗しました。お手数ですがお電話（${COMPANY.tel}）にてお問い合わせください。` },
      { status: 500 },
    );
  }
}
