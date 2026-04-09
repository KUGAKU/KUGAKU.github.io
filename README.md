# 苦学 Lab — KUGAKU.github.io

研究と思索の記録。Astro で構築され、GitHub Pages にデプロイされます。

## Pages

- `/`      — トップ / 研究関心 / 最新ノート
- `/about` — プロフィール、略歴、業績、連絡先
- `/notes` — note.com の投稿リンク一覧

## Stack

- [Astro](https://astro.build/) — 静的サイトジェネレータ
- 和風デザインシステム (藍 × 墨 / `src/styles/global.css`)
- Noto Sans JP + Shippori Mincho (Google Fonts)

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # ./dist に出力
npm run preview
```

## Customize

- サイト全体の設定:   `src/data/site.ts`
- プロフィール・CV:   `src/data/profile.ts`
- note 投稿リンク:    `src/data/notes.ts`

データが空のセクションは自動で非表示になります。

## Deploy

`main` ブランチへの push をトリガーに、
`.github/workflows/deploy.yml` が自動で GitHub Pages にデプロイします。

初回のみ、リポジトリの **Settings → Pages → Build and deployment → Source**
を **GitHub Actions** に設定してください。
