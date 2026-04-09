// サイト全体で共有する設定値
// Edit this file to customize the portfolio site.
//
// 日英バイリンガル対応: ja / en の両方に値を入れると、それぞれの言語の
// ページで正しく表示されます。片方だけ入れることも可能 (もう一方にフォールバック)

import type { L10n } from "../i18n/utils";

export interface NavItem {
  href: string;
  key: "nav.home" | "nav.about" | "nav.notes";
}

export interface RoleList {
  ja: string[];
  en: string[];
}

export interface Site {
  title: L10n;
  tagline: L10n;
  description: L10n;
  author: {
    name: L10n;
    roles: RoleList;
    affiliation: L10n;
    email: string;
    location: L10n;
  };
  nav: readonly NavItem[];
  social: {
    note: string;
    github: string;
    twitter: string;
    scholar: string;
    orcid: string;
  };
}

export const site: Site = {
  title: {
    ja: "苦学 Lab",
    en: "Kugaku Lab",
  },
  // タグラインはヘッダー/フッターの小さいサブタイトル。空にすると非表示。
  tagline: {
    ja: "",
    en: "",
  },
  description: {
    ja: "苦学 Lab — エンジニア / コンサルタント / 情報学を専攻中。",
    en: "Kugaku Lab — Engineer, consultant, and informatics major.",
  },
  author: {
    name: {
      ja: "苦学",
      en: "Kugaku",
    },
    // 肩書き: 表示順に並べる
    roles: {
      ja: ["エンジニア", "コンサルタント", "情報学を専攻中"],
      en: ["Engineer", "Consultant", "Majoring in Informatics"],
    },
    affiliation: { ja: "", en: "" },
    email: "",
    location: { ja: "", en: "" },
  },
  // ナビゲーション (labelは翻訳キーから解決されます)
  nav: [
    { href: "/", key: "nav.home" },
    { href: "/about/", key: "nav.about" },
    { href: "/notes/", key: "nav.notes" },
  ],
  // ソーシャルリンク (空文字にするとフッターに表示されません)
  social: {
    note: "",
    github: "https://github.com/KUGAKU",
    twitter: "",
    scholar: "",
    orcid: "",
  },
};
