"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

export const INQUIRY_TYPES = [
  "お見積もり依頼",
  "エアコン工事（取付・取替）",
  "業務用エアコン・空調設備",
  "エアコン修理・クリーニング",
  "電気工事・照明工事",
  "住宅設備工事",
  "法人・店舗の工事",
  "その他",
] as const;

type Fields = {
  name: string;
  company: string;
  email: string;
  tel: string;
  type: string;
  message: string;
  agree: boolean;
  website: string; // ハニーポット
};

const EMPTY: Fields = { name: "", company: "", email: "", tel: "", type: "", message: "", agree: false, website: "" };

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) e.name = "お名前を入力してください。";
  if (!f.email.trim()) e.email = "メールアドレスを入力してください。";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "メールアドレスの形式が正しくありません。";
  if (!f.tel.trim()) e.tel = "電話番号を入力してください。";
  else if (!/^[0-9０-９\-－()（）+\s]{10,16}$/.test(f.tel.trim())) e.tel = "電話番号の形式が正しくありません。";
  if (!f.type) e.type = "お問い合わせの種類を選択してください。";
  if (!f.message.trim()) e.message = "お問い合わせ内容を入力してください。";
  else if (f.message.length > 3000) e.message = "3000文字以内で入力してください。";
  if (!f.agree) e.agree = "プライバシーポリシーへの同意が必要です。";
  return e;
}

export default function ContactForm() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");
  const doneRef = useRef<HTMLDivElement>(null);

  // 「見積りフォームへ」から来た場合は種類を自動選択
  useEffect(() => {
    const apply = () => {
      if (window.location.hash === "#estimate") setF((p) => ({ ...p, type: p.type || "お見積もり依頼" }));
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  useEffect(() => {
    if (status === "done") doneRef.current?.focus();
  }, [status]);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setF((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    setServerMsg("");
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; errors?: Record<string, string> };
      if (res.ok && data.ok) {
        setStatus("done");
        setF(EMPTY);
      } else {
        if (data.errors) setErrors(data.errors);
        setServerMsg(data.message || "送信に失敗しました。時間をおいて再度お試しください。");
        setStatus("error");
      }
    } catch {
      setServerMsg("通信エラーが発生しました。お手数ですがお電話（098-988-9953）でもお問い合わせいただけます。");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="form-done" ref={doneRef} tabIndex={-1} role="status">
        <span className="icircle" style={{ width: 72, height: 72 }}>
          <Icon name="check" size={36} />
        </span>
        <h3>お問い合わせありがとうございます。</h3>
        <p>
          送信が完了しました。内容を確認のうえ、担当者より折り返しご連絡いたします。
          <br />
          お急ぎの場合はお電話（098-988-9953）にてご連絡ください。
        </p>
        <button type="button" className="btn btn--outline btn--sm" onClick={() => setStatus("idle")}>
          続けてお問い合わせする
        </button>
      </div>
    );
  }

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p className="form__err" id={`e-${k}`} role="alert">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Fields) => ({ "aria-invalid": !!errors[k] || undefined, "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form__grid">
        <div className="form__row">
          <label htmlFor="f-name">
            お名前<span className="req">※</span>
          </label>
          <input id="f-name" type="text" autoComplete="name" placeholder="例）沖空　太郎" value={f.name} onChange={(e) => set("name", e.target.value)} {...aria("name")} />
          {err("name")}
        </div>
        <div className="form__row">
          <label htmlFor="f-company">会社名</label>
          <input id="f-company" type="text" autoComplete="organization" placeholder="例）株式会社沖空電" value={f.company} onChange={(e) => set("company", e.target.value)} />
        </div>
        <div className="form__row">
          <label htmlFor="f-email">
            メールアドレス<span className="req">※</span>
          </label>
          <input id="f-email" type="email" autoComplete="email" inputMode="email" placeholder="例）example@okiku-den.co.jp" value={f.email} onChange={(e) => set("email", e.target.value)} {...aria("email")} />
          {err("email")}
        </div>
        <div className="form__row">
          <label htmlFor="f-tel">
            電話番号<span className="req">※</span>
          </label>
          <input id="f-tel" type="tel" autoComplete="tel" inputMode="tel" placeholder="例）090-1234-5678" value={f.tel} onChange={(e) => set("tel", e.target.value)} {...aria("tel")} />
          {err("tel")}
        </div>
        <div className="form__row form__row--full">
          <label htmlFor="f-type">
            お問い合わせの種類<span className="req">※</span>
          </label>
          <div className="select">
            <select id="f-type" value={f.type} onChange={(e) => set("type", e.target.value)} {...aria("type")}>
              <option value="">選択してください</option>
              {INQUIRY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <Icon name="chevron" size={18} />
          </div>
          {err("type")}
        </div>
        <div className="form__row form__row--full">
          <label htmlFor="f-message">
            お問い合わせ内容<span className="req">※</span>
          </label>
          <textarea id="f-message" rows={6} placeholder="ご相談内容などを詳しくご入力ください。（例：エアコンの取替を検討しています。設置場所は那覇市の戸建てです。）" value={f.message} onChange={(e) => set("message", e.target.value)} {...aria("message")} />
          {err("message")}
        </div>
        {/* ハニーポット（スパム対策・人には非表示） */}
        <div className="hp" aria-hidden="true">
          <label htmlFor="f-website">Website</label>
          <input id="f-website" type="text" tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set("website", e.target.value)} />
        </div>
      </div>

      <p className="form__notice">
        ※携帯メールでお申し込みの場合は、受信拒否設定によりお問合せメールが返信できない場合があります。あらかじめPCメールの受信拒否設定を解除するか、okiku-den.co.jpドメインを受信ドメイン指定に設定してください。
      </p>

      <div className="form__agree">
        <label>
          <input id="f-agree" type="checkbox" checked={f.agree} onChange={(e) => set("agree", e.target.checked)} {...aria("agree")} />
          <span>
            <Link href="/privacy-policy/" target="_blank">
              プライバシーポリシー
            </Link>
            に同意する
          </span>
        </label>
        {err("agree")}
      </div>

      {status === "error" && serverMsg && (
        <p className="form__server-err" role="alert">
          {serverMsg}
        </p>
      )}

      <button type="submit" className="btn btn--yellow btn--lg form__submit" disabled={status === "sending"}>
        <Icon name="send" size={20} />
        {status === "sending" ? "送信中…" : "送信する"}
      </button>
      <p className="form__small">※ご入力いただいた個人情報は、お問い合わせ対応のみに使用いたします。</p>
    </form>
  );
}
