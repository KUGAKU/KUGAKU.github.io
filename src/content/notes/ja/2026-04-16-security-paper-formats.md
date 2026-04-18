---
title: "セキュリティ系カンファレンスの論文形式 5 つ — Technical / SoK / Replication / Measurement / Applied Crypto"
date: "2026-04-16"
excerpt: "研究テーマを探るサーベイの過程で気づいた『貢献の型』の話。セキュリティ系カンファレンスは『新しい手法を提案する論文』だけではなく、Systematization of Knowledge (SoK) や Replication など、複数の貢献パターンを明示的に募集している。初心者の自分が 5 つに整理したメモ。"
tags:
  - 論文形式
  - SoK
  - 国際会議
  - 研究計画
  - サーベイメモ
  - 学び
---

## はじめに — なぜ「貢献の型」を整理したか

サーベイで論文をいくつか漁る過程で、論文って型とか形式があるんじゃないかな？と思い、調べてみた。「論文 = 新しいものを提案するもの」だと思い込んでるけど、どんな形式があるのか、知れたほうが描きやすくなるのかな？と思った。

調べてみると、セキュリティ系の国際会議は複数の貢献パターンを明示的に募集していて、自分なりに 5 つに整理してみた。

## 5 つの型を一覧で

自分が見つけた 5 つを、箇条書きで並べる。各型の詳細は後ろの章で掘り下げる予定。

- **Technical Paper** — 新しい手法・構成・攻撃・ツールを提案する論文。ほぼ全ての会議で主軸となる形式。CFP 上は特に型名がつかず、"original research contributions" 等と書かれることが多い。いわゆる「論文」と聞いて最初にイメージするのはこれ
- **SoK (Systematization of Knowledge)** — 既存研究を整理・評価・体系化する論文。「新しい手法を作る」のではなく「既存の技術を地図にする」ことで貢献する。[IEEE S&P](https://www.ieee-security.org/TC/SP-Index.html) / [Usenix Security](https://www.usenix.org/conferences/byname/108) / [PETS](https://petsymposium.org/) / [NDSS](https://www.ndss-symposium.org/) が明示的に募集しており、[oaklandsok.github.io](https://oaklandsok.github.io/) に IEEE S&P の SoK 採択論文が集約されている
- **Replication Paper** — 既発表の論文を独立に再現・検証する論文。結果の追試・反証・再確認に学術的価値を認める形式。[Usenix Security](https://www.usenix.org/conferences/byname/108) 等が募集している。成果物の再現性を審査する Artifact Evaluation とは別もので、こちらは独立した論文として出すもの
- **Measurement Paper** — 実世界で大規模な測定を行い、現象を定量的に示す論文。TLS の普及率、マルウェアの分布、Tor のトラフィック分析など、スケールのあるデータ収集とその解釈が貢献の中心。[IMC (Internet Measurement Conference)](https://www.sigcomm.org/events/imc-conference) が専門会議で、Big 4 でも常連の形式
- **Applied Crypto Paper** — 既存の暗号プリミティブを実アプリに適用し、設計・実装・評価する論文。新構成ではなく「組み合わせ方」と「実環境での制約下での評価」が貢献の軸。[Real World Crypto](https://rwc.iacr.org/) が近い立ち位置のシンポジウムとして知られているが、査読付き論文としては Usenix Security / PETS 等に出すことが多い

## 一次ソース

この記事で触れた論文形式について、各会議の Call for Papers (CFP) でどう記述されているかのリンクを置いておく。

- [IEEE S&P — Call for Papers](https://www.ieee-security.org/TC/SP-Index.html) — SoK (Systematization of Knowledge) を明示募集
- [Usenix Security — Call for Papers](https://www.usenix.org/conferences/byname/108) — SoK を明示募集
- [PETS — Call for Papers](https://petsymposium.org/) — SoK を明示募集。投稿先は PoPETs (ジャーナル形式、年 4 回締切)
- [NDSS — Call for Papers](https://www.ndss-symposium.org/) — SoK を明示募集
- [oaklandsok.github.io](https://oaklandsok.github.io/) — IEEE S&P に採択された SoK 論文の集約サイト
- [IMC (Internet Measurement Conference)](https://www.sigcomm.org/events/imc-conference) — Measurement Paper の専門会議
- [Real World Crypto](https://rwc.iacr.org/) — Applied Crypto 寄りのシンポジウム (査読付き論文ではなく招待講演中心)
