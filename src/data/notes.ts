// note.com の投稿リンク一覧
// Add new entries here as you publish on note. Newest first.
//
// バイリンガル対応: title / excerpt は文字列または { ja, en } オブジェクトで
// 指定できます。英語版が未設定の場合は自動的に日本語にフォールバックします。
//
// 例 (日本語のみ):
//   {
//     title: "記事タイトル",
//     url: "https://note.com/your-id/n/xxxxxxxxxxxx",
//     date: "2026-04-09",
//     excerpt: "記事の要約 (任意)",
//     tags: ["タグ1", "タグ2"],
//   },
//
// 例 (日英両方):
//   {
//     title: { ja: "研究ノート", en: "Research Notebook" },
//     url: "https://note.com/...",
//     date: "2026-04-09",
//     excerpt: { ja: "要約", en: "Summary" },
//     tags: ["research"],
//   },

import type { L10n } from "../i18n/utils";

export interface Note {
  title: L10n;
  url: string;
  date: string; // YYYY-MM-DD
  excerpt?: L10n;
  tags?: string[];
}

export const notes: Note[] = [
  {
    title: {
      ja: "研究計画の骨格を、なんとなく整理してみた",
      en: "Sketching out the skeleton of a research plan",
    },
    // TODO: note 公開後に本物の URL に差し替える
    url: "https://note.com/",
    date: "2026-04-09",
    excerpt: {
      ja: "授業で整理された研究計画の7段階を、自分用にまとめたメモ。問いの絞り込みと、基本仮説から作業仮説への落とし込みがキモだった。",
      en: "A personal memo on the 7-step research plan framework from class. The key bits were narrowing the question and grounding the hypothesis into something measurable.",
    },
    tags: ["研究計画", "学び", "授業メモ"],
  },
];
