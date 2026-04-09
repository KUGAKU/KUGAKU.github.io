import { ui, defaultLang, type Lang, type UIKey } from "./ui";

// URLから現在の言語を判定する
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split("/");
  if (first && first in ui) return first as Lang;
  return defaultLang;
}

// 翻訳関数を返す
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key] ?? key;
  };
}

// バイリンガル値の型 — 文字列または {ja, en} オブジェクトを受け取る
export type L10n = string | { ja?: string; en?: string };

// 指定された言語でローカライズされた文字列を取り出す
// フォールバック: ja → en → 任意の非空値 → ""
export function pick(value: L10n | undefined, lang: Lang): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return (
    value[lang] ||
    value.ja ||
    value.en ||
    Object.values(value).find((v): v is string => !!v) ||
    ""
  );
}

// 現在のパスを対象言語のパスに変換する
// 例: /about/ + en => /en/about/
//     /en/about/ + ja => /about/
export function localizePath(pathname: string, targetLang: Lang): string {
  let stripped = pathname;
  if (stripped === "/en" || stripped.startsWith("/en/")) {
    stripped = stripped.slice(3) || "/";
  }
  if (targetLang === defaultLang) return stripped;
  if (stripped === "/") return "/en/";
  return "/en" + stripped;
}
