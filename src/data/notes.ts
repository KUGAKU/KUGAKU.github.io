// note.com の投稿リンク一覧
// Add new entries here as you publish on note. Newest first.
//
// 例:
//   {
//     title: "記事タイトル",
//     url: "https://note.com/your-id/n/xxxxxxxxxxxx",
//     date: "2026-04-09",
//     excerpt: "記事の要約 (任意)",
//     tags: ["タグ1", "タグ2"],
//   },

export interface Note {
  title: string;
  url: string;
  date: string; // YYYY-MM-DD
  excerpt?: string;
  tags?: string[];
}

export const notes: Note[] = [];
