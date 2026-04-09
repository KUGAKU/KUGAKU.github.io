// プロフィールとCV情報
// Edit this file to customize your profile / researcher info.
//
// 使い方:
//   - bio: 自己紹介文 (空文字にするとセクションが非表示になります)
//   - interests: 研究関心 (空配列でセクション非表示)
//   - cv: 略歴 (空配列でセクション非表示)
//   - publications: 業績一覧 (空配列でセクション非表示)

export interface Interest {
  ja: string;
  en: string;
}

export interface CVEntry {
  year: string;
  title: string;
  org: string;
  detail?: string;
}

export interface Publication {
  year: string;
  title: string;
  authors: string;
  venue?: string;
  url?: string;
}

export interface Profile {
  greetingJa: string;
  greetingEn: string;
  bio: string;
  interests: Interest[];
  cv: CVEntry[];
  publications: Publication[];
}

export const profile: Profile = {
  greetingJa: "",
  greetingEn: "",
  bio: "",
  interests: [],
  cv: [],
  publications: [],
};
