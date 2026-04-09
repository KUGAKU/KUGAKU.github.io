// note.com の投稿リンク一覧
// Add new entries here as you publish on note. Newest first.
//
// tips:
//   - url: noteの投稿URLをそのまま貼ってください
//   - date: 公開日 (YYYY-MM-DD)
//   - tags: 任意。配列で複数指定できます

export interface Note {
  title: string;
  url: string;
  date: string; // YYYY-MM-DD
  excerpt?: string;
  tags?: string[];
}

export const notes: Note[] = [
  {
    title: "研究ノートの書き出しについて",
    url: "https://note.com/",
    date: "2026-03-20",
    excerpt:
      "最初の一文を書くということ。仮説と疑問の間を往復しながら、研究ノートに何を残しておくべきか。",
    tags: ["研究ノート", "方法論"],
  },
  {
    title: "読書のあしあと 〈冬〉",
    url: "https://note.com/",
    date: "2026-02-08",
    excerpt:
      "この冬に読み返した本の記録。再読によって立ち現れてくる問いについて。",
    tags: ["読書", "雑記"],
  },
  {
    title: "学会発表を終えて",
    url: "https://note.com/",
    date: "2025-12-12",
    excerpt:
      "国際学会での発表を終えての所感。質疑応答から得られた示唆をまとめる。",
    tags: ["学会", "発表"],
  },
];
