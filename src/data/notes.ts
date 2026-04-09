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

export const notes: Note[] = [];
