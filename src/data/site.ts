// サイト全体で共有する設定値
// Edit this file to customize the portfolio site.

export const site = {
  title: "苦学 Lab",
  tagline: "Kugaku Lab — 研究と思索の記録",
  description:
    "苦学 Lab — 研究者のポートフォリオサイト。プロフィール、研究関心、そしてnoteに綴る記録をまとめています。",
  author: {
    name: "苦学",
    nameEn: "Kugaku",
    role: "",
    affiliation: "",
    email: "",
    location: "",
  },
  // ナビゲーション
  nav: [
    { href: "/", label: "ホーム", labelEn: "Home" },
    { href: "/about/", label: "プロフィール", labelEn: "About" },
    { href: "/notes/", label: "ノート", labelEn: "Notes" },
  ],
  // ソーシャルリンク (空文字にするとフッターに表示されません)
  social: {
    note: "",
    github: "https://github.com/KUGAKU",
    twitter: "",
    scholar: "",
    orcid: "",
  },
} as const;
