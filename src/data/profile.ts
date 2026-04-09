// プロフィールとCV情報
// Edit this file to customize your profile / researcher info.

export const profile = {
  greetingJa: "ようこそ、わたしの研究記録へ。",
  greetingEn: "Welcome to my research notebook.",
  bio: `研究と思索の記録を、ここに静かに綴っています。日々の問いや読書のあしあと、そして学会発表や論文執筆のメモを一つの庭のように並べておく場所です。`,
  interests: [
    { ja: "計算機科学", en: "Computer Science" },
    { ja: "言語・認知", en: "Language & Cognition" },
    { ja: "人文学との対話", en: "Dialogue with the Humanities" },
    { ja: "学術コミュニケーション", en: "Scholarly Communication" },
  ],
  // 略歴
  cv: [
    {
      year: "2024–",
      title: "研究員",
      org: "所属機関名",
      detail: "研究テーマの概要をここに記述します。",
    },
    {
      year: "2021–2024",
      title: "博士課程",
      org: "大学院名",
      detail: "専攻分野と研究内容の概要。",
    },
    {
      year: "2019–2021",
      title: "修士課程",
      org: "大学院名",
      detail: "修士研究テーマ。",
    },
  ],
  // 主要な業績 (論文・発表など)
  publications: [
    {
      year: "2024",
      title: "論文タイトルをここに記載",
      authors: "著者名, 共著者名",
      venue: "学会誌・会議名",
      url: "",
    },
    {
      year: "2023",
      title: "別の論文タイトルをここに記載",
      authors: "著者名, 共著者名",
      venue: "学会誌・会議名",
      url: "",
    },
  ],
} as const;
