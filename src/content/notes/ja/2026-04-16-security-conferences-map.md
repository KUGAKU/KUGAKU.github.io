---
title: "国際セキュリティ系カンファレンスの地図 — サーベイの過程で並べ直した"
date: "2026-04-16"
excerpt: "研究テーマを探るサーベイの副産物として、セキュリティ・暗号・プライバシーまわりの主要な国際会議を初心者の自分向けに並べ直した。存在と簡単な概要だけ。"
tags:
  - 国際会議
  - セキュリティ
  - 暗号
  - プライバシー
  - サーベイメモ
  - 学び
---

## はじめに

サーベイで論文を漁っていると、会議名がたくさん出てくる。CCS、Usenix Security、IEEE S&P……。どれが何を扱っていて、どういう立ち位置なのかが分からないと論文の文脈も掴みづらいので、自分用にざっと並べ直した。

深い分析はしていない。存在と概要だけ。

## セキュリティ 4 大会議 — いわゆる Big 4

セキュリティ分野で慣習的に "Big 4" と呼ばれている 4 つの会議。

- **[IEEE S&P (Oakland)](https://www.ieee-security.org/TC/SP-Index.html)** — IEEE 主催。セキュリティ全般を扱う旗艦会議。通称 "Oakland" は元の開催地に由来。SoK 論文を明示募集しており、[oaklandsok.github.io](https://oaklandsok.github.io/) に採択論文が集約されている
- **[Usenix Security](https://www.usenix.org/conferences/byname/108)** — USENIX Association 主催。セキュリティ全般。システム寄り・実装寄りのトーンが強いと言われる。SoK も募集
- **[ACM CCS](https://www.sigsac.org/ccs.html)** — ACM SIGSAC 主催。セキュリティ全般。暗号実装・プロトコル系の論文が多い印象
- **[NDSS](https://www.ndss-symposium.org/)** — Internet Society (ISOC) 主催。名前はネットワーク・分散系だが、扱う範囲は広い。SoK も募集

## 暗号理論寄り — IACR 系

[IACR (International Association for Cryptologic Research)](https://iacr.org/) が主催する会議群。理論寄りで数学が重い。FHE や PIR の基礎理論はここに出ることが多い。

- **[CRYPTO](https://iacr.org/conferences/)** — IACR の旗艦。米国 (Santa Barbara) 開催
- **[EUROCRYPT](https://iacr.org/conferences/)** — 欧州開催。旗艦クラス
- **[ASIACRYPT](https://iacr.org/conferences/)** — アジア開催。旗艦クラス
- **[TCC](https://iacr.org/conferences/)** — Theory of Cryptography Conference。基礎理論寄り
- **[PKC](https://iacr.org/conferences/)** — Public-Key Cryptography。公開鍵暗号に特化

## プライバシー専門 — PETS

- **[PETS (Privacy Enhancing Technologies Symposium)](https://petsymposium.org/)** — プライバシー技術全般を扱う。投稿先は PoPETs というジャーナル形式で、年 4 回の締切がある (ローリング投稿)。匿名通信、差分プライバシー、PIR、FHE など。SoK も募集

## アプライド / 地域系

Big 4 ほど競争が激しくないが、実装寄り・応用寄りの論文の出しどころとして知られる会議群。

- **[ACSAC](https://www.acsac.org/)** — Annual Computer Security Applications Conference。アプライドセキュリティ寄り
- **[ESORICS](https://esorics2024.org/)** — European Symposium on Research in Computer Security。欧州系
- **[AsiaCCS](https://asiaccs2024.sutd.edu.sg/)** — ACM Asia Conference on Computer and Communications Security。アジア地域
- **[WIFS](https://ieee-wifs.org/)** — IEEE Workshop on Information Forensics and Security。マルチメディアフォレンジック系。[フェイクメディア検出のサーベイメモ](/notes/ja/2026-04-14-infodemic-fakemedia-survey) でも出てきた会議

## 一次ソース

- [IACR — カンファレンス一覧](https://iacr.org/conferences/)
- [IEEE S&P](https://www.ieee-security.org/TC/SP-Index.html)
- [Usenix Security](https://www.usenix.org/conferences/byname/108)
- [ACM CCS](https://www.sigsac.org/ccs.html)
- [NDSS](https://www.ndss-symposium.org/)
- [PETS / PoPETs](https://petsymposium.org/)
- [oaklandsok.github.io — SoK 採択論文集](https://oaklandsok.github.io/)
