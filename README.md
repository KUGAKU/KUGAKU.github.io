# 苦学 log — KUGAKU.github.io

研究と思索の記録。Astro で構築され、GitHub Pages にデプロイされます。

## Pages

- `/`         — トップ / 研究関心 / 最新ノート
- `/about/`   — プロフィール、略歴、業績、連絡先
- `/notes/`   — note.com の投稿リンク一覧
- `/en/...`   — 英語版 (上記と同じ構成)

## Features

- **Bilingual (日英)** — Astro の i18n ルーティング (ja: `/`, en: `/en/`)
  + `<html lang>`、`hreflang` alternates、OG locale が言語ごとに切り替わります
- **Dark mode** — 朝藍 / 墨夜のトグル。`prefers-color-scheme` を尊重し、
  選択は `localStorage` に保存。FOUC を防ぐためのインライン初期化スクリプト付き
- 和風デザインシステム (藍 × 墨)
- Noto Sans JP + Shippori Mincho (Google Fonts)
- レスポンシブ (480 / 560 / 720 / 960 / 1200px breakpoints)

## Stack

- [Astro](https://astro.build/) — 静的サイトジェネレータ

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
- UI 文字列翻訳:      `src/i18n/ui.ts`

データが空のセクションは自動で非表示になります。

### バイリンガルデータの書き方

```ts
// 日本語のみ
bio: { ja: "研究と思索の記録です。", en: "" }

// 日英両方
bio: {
  ja: "研究と思索の記録です。",
  en: "Notes on research and reflection.",
}
```

英語版が空の場合は自動的に日本語にフォールバックします (逆も同様)。

## Deploy

`main` ブランチへの push をトリガーに、
`.github/workflows/deploy.yml` が自動で GitHub Pages にデプロイします。

初回のみ、リポジトリの **Settings → Pages → Build and deployment → Source**
を **GitHub Actions** に設定してください。
