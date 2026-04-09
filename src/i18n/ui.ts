// 翻訳辞書 / Translation dictionaries
// Add new keys to both `ja` and `en`. TypeScript enforces parity.

export const languages = {
  ja: "日本語",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "ja";

export const ui = {
  ja: {
    "site.skipMain": "本文へスキップ",

    "nav.home": "ホーム",
    "nav.about": "プロフィール",
    "nav.notes": "ノート",

    "theme.toggle": "テーマを切り替え",
    "theme.light": "ライト",
    "theme.dark": "ダーク",

    "lang.switch": "言語を切り替え",

    "home.eyebrow": "苦学 Lab — Kugaku Lab",
    "home.bioPlaceholder": "研究と思索の場を、ここに静かに置いています。",
    "home.cta.about": "プロフィール",
    "home.cta.notes": "ノート",
    "home.interests.title": "研究関心",
    "home.interests.kicker": "Research Interests",
    "home.latest.title": "最新のノート",
    "home.latest.kicker": "Latest Notes",
    "home.latest.more": "すべてのノートを見る →",
    "home.latest.empty": "まだ投稿はありません。",

    "about.eyebrow": "About",
    "about.title": "プロフィール",
    "about.sub": "研究者としての歩みと、関心の軌跡",
    "about.placeholder.text": "プロフィール情報はまだ準備中です。",
    "about.placeholder.hintPre": "",
    "about.placeholder.hintPost":
      " を編集すると、略歴・研究関心・業績などがここに表示されます。",
    "about.block.interests.main": "研究関心",
    "about.block.interests.sub": "Interests",
    "about.block.cv.main": "略歴",
    "about.block.cv.sub": "Curriculum Vitae",
    "about.block.pub.main": "主要な業績",
    "about.block.pub.sub": "Selected Publications",
    "about.block.contact.main": "連絡",
    "about.block.contact.sub": "Contact",
    "about.contact.body":
      "お問い合わせは、以下のいずれかよりお気軽にどうぞ。",

    "notes.eyebrow": "Notes",
    "notes.title": "ノート",
    "notes.sub": "日々の思索と研究の記録を、note に綴っています",
    "notes.intro.pre": "こちらは",
    "notes.intro.post":
      "で公開している投稿の一覧です。各リンクを開くと、noteの記事ページに遷移します。",
    "notes.card.cta": "記事を読む →",
    "notes.card.ariaOpen": "noteの記事「",
    "notes.card.ariaClose": "」を開く",
    "notes.count.one": " entry",
    "notes.count.other": " entries",
    "notes.empty.text": "まだ投稿はありません。",
    "notes.empty.hintPre": "",
    "notes.empty.hintPost":
      " に note の記事情報を追加すると、ここに一覧が表示されます。",

    "footer.rights": "All rights reserved.",
  },
  en: {
    "site.skipMain": "Skip to main content",

    "nav.home": "Home",
    "nav.about": "About",
    "nav.notes": "Notes",

    "theme.toggle": "Toggle theme",
    "theme.light": "Light",
    "theme.dark": "Dark",

    "lang.switch": "Change language",

    "home.eyebrow": "KUGAKU LAB",
    "home.bioPlaceholder": "A quiet corner for research and reflection.",
    "home.cta.about": "About",
    "home.cta.notes": "Notes",
    "home.interests.title": "Research Interests",
    "home.interests.kicker": "研究関心",
    "home.latest.title": "Latest Notes",
    "home.latest.kicker": "最新のノート",
    "home.latest.more": "Read all notes →",
    "home.latest.empty": "No entries yet.",

    "about.eyebrow": "About",
    "about.title": "Profile",
    "about.sub": "A researcher's path and interests",
    "about.placeholder.text": "Profile details are in preparation.",
    "about.placeholder.hintPre": "Edit ",
    "about.placeholder.hintPost":
      " to show biography, interests, and publications here.",
    "about.block.interests.main": "Research Interests",
    "about.block.interests.sub": "研究関心",
    "about.block.cv.main": "Curriculum Vitae",
    "about.block.cv.sub": "略歴",
    "about.block.pub.main": "Selected Publications",
    "about.block.pub.sub": "主要な業績",
    "about.block.contact.main": "Contact",
    "about.block.contact.sub": "連絡",
    "about.contact.body":
      "Feel free to reach out through any of the channels below.",

    "notes.eyebrow": "Notes",
    "notes.title": "Notes",
    "notes.sub": "Research and reflections, published on note",
    "notes.intro.pre": "These are posts published on ",
    "notes.intro.post":
      ". Each link opens the original article on note.",
    "notes.card.cta": "Read on note →",
    "notes.card.ariaOpen": 'Open note article "',
    "notes.card.ariaClose": '"',
    "notes.count.one": " entry",
    "notes.count.other": " entries",
    "notes.empty.text": "No entries yet.",
    "notes.empty.hintPre": "Add entries in ",
    "notes.empty.hintPost": " to see them listed here.",

    "footer.rights": "All rights reserved.",
  },
} satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
