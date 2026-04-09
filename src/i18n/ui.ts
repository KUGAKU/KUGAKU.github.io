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

    "home.cta.about": "プロフィール",
    "home.cta.notes": "ノート",
    "home.interests.title": "関心",
    "home.interests.kicker": "Interests",
    "home.latest.title": "最新のノート",
    "home.latest.kicker": "Latest Notes",
    "home.latest.more": "すべてのノートを見る →",
    "home.latest.empty": "投稿はまだありません。",

    "about.eyebrow": "About",
    "about.title": "プロフィール",
    "about.placeholder.text": "プロフィールは準備中です。",
    "about.placeholder.hintPre": "",
    "about.placeholder.hintPost": " を編集すると、ここに表示されます。",
    "about.roles.main": "肩書き",
    "about.roles.sub": "Roles",
    "about.block.interests.main": "関心",
    "about.block.interests.sub": "Interests",
    "about.block.cv.main": "略歴",
    "about.block.cv.sub": "Curriculum Vitae",
    "about.block.pub.main": "業績",
    "about.block.pub.sub": "Works",
    "about.block.contact.main": "連絡先",
    "about.block.contact.sub": "Contact",
    "about.contact.body": "お問い合わせは以下から。",

    "notes.eyebrow": "Notes",
    "notes.title": "ノート",
    "notes.sub": "書いたものの一覧",
    "notes.card.cta": "続きを読む →",
    "notes.card.ariaOpen": "note の記事「",
    "notes.card.ariaClose": "」を開く",
    "notes.count.one": " 件",
    "notes.count.other": " 件",
    "notes.empty.text": "投稿はまだありません。",
    "notes.empty.hintPre": "",
    "notes.empty.hintPost": " に追加すると、ここに表示されます。",

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

    "home.cta.about": "About",
    "home.cta.notes": "Notes",
    "home.interests.title": "Interests",
    "home.interests.kicker": "関心",
    "home.latest.title": "Latest Notes",
    "home.latest.kicker": "最新のノート",
    "home.latest.more": "See all notes →",
    "home.latest.empty": "No posts yet.",

    "about.eyebrow": "About",
    "about.title": "Profile",
    "about.placeholder.text": "Profile is in progress.",
    "about.placeholder.hintPre": "Edit ",
    "about.placeholder.hintPost": " to show content here.",
    "about.roles.main": "Roles",
    "about.roles.sub": "肩書き",
    "about.block.interests.main": "Interests",
    "about.block.interests.sub": "関心",
    "about.block.cv.main": "Curriculum Vitae",
    "about.block.cv.sub": "略歴",
    "about.block.pub.main": "Works",
    "about.block.pub.sub": "業績",
    "about.block.contact.main": "Contact",
    "about.block.contact.sub": "連絡先",
    "about.contact.body": "Get in touch via:",

    "notes.eyebrow": "Notes",
    "notes.title": "Notes",
    "notes.sub": "Things I've written",
    "notes.card.cta": "Read more →",
    "notes.card.ariaOpen": 'Open note article "',
    "notes.card.ariaClose": '"',
    "notes.count.one": " post",
    "notes.count.other": " posts",
    "notes.empty.text": "No posts yet.",
    "notes.empty.hintPre": "Add posts to ",
    "notes.empty.hintPost": " to see them here.",

    "footer.rights": "All rights reserved.",
  },
} satisfies Record<Lang, Record<string, string>>;

export type UIKey = keyof (typeof ui)[typeof defaultLang];
