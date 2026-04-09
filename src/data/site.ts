// サイト全体で共有する設定値
// Edit this file to customize the portfolio site.

export const site = {
  title: "KUGAKU 研究室",
  tagline: "研究・思索・記録",
  description:
    "研究者のポートフォリオサイト。プロフィール、研究内容、そしてnoteに綴る記録をまとめています。",
  author: {
    name: "KUGAKU",
    nameEn: "Kugaku",
    role: "研究者 / Researcher",
    affiliation: "",
    email: "",
    location: "日本",
  },
  // ナビゲーション
  nav: [
    { href: "/", label: "ホーム", labelEn: "Home" },
    { href: "/about/", label: "プロフィール", labelEn: "About" },
    { href: "/notes/", label: "ノート", labelEn: "Notes" },
  ],
  // ソーシャルリンク
  social: {
    note: "https://note.com/",
    github: "https://github.com/KUGAKU",
    twitter: "",
    scholar: "",
    orcid: "",
  },
} as const;
