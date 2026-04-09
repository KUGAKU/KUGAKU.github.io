// プロフィールとCV情報
// Edit this file to customize your profile / researcher info.
//
// バイリンガル対応: bio / cv / interests の文字列は
// { ja: "...", en: "..." } の形式で書けます。
// 片方だけでも OK (もう一方にフォールバックします)。
// publications は一つの言語のみで書くことが多いため string のままです。

import type { L10n } from "../i18n/utils";

export interface Interest {
  ja: string;
  en: string;
}

export interface CVEntry {
  year: string;
  title: L10n;
  org: L10n;
  detail?: L10n;
}

export interface Publication {
  year: string;
  title: string;
  authors: string;
  venue?: string;
  url?: string;
}

export interface Profile {
  greeting: L10n;
  bio: L10n;
  interests: Interest[];
  cv: CVEntry[];
  publications: Publication[];
}

export const profile: Profile = {
  greeting: { ja: "", en: "" },
  bio: { ja: "", en: "" },
  interests: [],
  cv: [],
  publications: [],
};
