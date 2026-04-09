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

export interface Site {
  title: L10n;
  tagline: L10n;
  description: L10n;
  author: {
    name: L10n;
    role: L10n;
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
  tagline: {
    ja: "Kugaku Lab — 研究と思索の記録",
    en: "Kugaku Lab — Notes on research & thought",
  },
  description: {
    ja: "苦学 Lab — 研究者のポートフォリオサイト。プロフィール、研究関心、そしてnoteに綴る記録をまとめています。",
    en: "Kugaku Lab — A researcher's portfolio: profile, interests, and notes published on note.",
  },
  author: {
    name: {
      ja: "苦学",
      en: "Kugaku",
    },
    role: { ja: "", en: "" },
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
