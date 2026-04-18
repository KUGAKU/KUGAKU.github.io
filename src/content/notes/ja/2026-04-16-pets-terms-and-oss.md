---
title: "プライバシー保護技術 (PETs) の用語と、現時点の OSS 実装を並べてみた"
date: "2026-04-16"
excerpt: "研究テーマを探るサーベイの副産物として、プライバシー保護技術 (PETs) まわりの用語を 7 つ並べ直した。何を隠せるか・代表的な OSS・立ち位置、を初心者の自分用に整理したメモ。"
tags:
  - プライバシー保護技術
  - PETs
  - FHE
  - MPC
  - ZKP
  - PIR
  - TEE
  - 差分プライバシー
  - サーベイメモ
---

## はじめに

研究テーマを探る[サーベイ](/notes/ja/2026-04-16-research-direction-fhe-pir)の副産物として、PETs (Privacy-Enhancing Technologies / プライバシー保護技術) まわりの用語を並べ直した。初心者の自分用の辞典メモ。網羅ではなく、今日のサーベイで触れた 7 つだけ。

OSS 実装は「今日時点で代表的なもの」を挙げているだけなので、使う前に最終更新日を自分で確認してほしい。

## 7 つを俯瞰する

| 技術 | 何を隠せるか | 代表 OSS | 立ち位置 |
| ------ | ------------- | ---------- | --------- |
| FHE | 入力データ (暗号化したまま計算) | OpenFHE, TFHE-rs, Microsoft SEAL | 研究 → 実用化の移行期 |
| MPC | 各参加者の入力 | MP-SPDZ, CrypTen | 実用ユースケースあり |
| ZKP | 証明者の秘密 | circom, arkworks, Halo2 | ブロックチェーンで量産中 |
| ABE | 暗号文の閲覧権 (属性ベース) | OpenABE, Charm-Crypto | 研究寄り |
| PIR | クエリ内容 | SealPIR, SimplePIR | 研究 → 実装移行中 |
| DP | 個人の寄与 (統計的に秘匿) | Google DP, OpenDP, Opacus | 本番運用例あり |
| TEE | メモリ内容 (ハードウェア隔離) | Gramine, Open Enclave | 本番運用あり、信頼モデル要注意 |

## FHE — 完全準同型暗号 (Fully Homomorphic Encryption)

暗号化したまま計算できる暗号。復号しなくても加算・乗算ができる。クラウドにデータを暗号化して投げて、計算結果だけ受け取る、という使い方が想定されている。

方式の家族として BFV / BGV (整数向け)、CKKS (近似浮動小数、ML と相性がいい)、TFHE / FHEW (1 ビット単位、ブートストラップが速い) がある。

代表 OSS:

- [OpenFHE](https://github.com/openfheorg/openfhe-development) — C++。PALISADE + HElib の後継で、幅広い方式に対応
- [Microsoft SEAL](https://github.com/microsoft/SEAL) — C++ / .NET。BFV / CKKS / BGV
- [TFHE-rs](https://github.com/zama-ai/tfhe-rs) — Rust。Zama が開発。TFHE 実装
- [Concrete](https://github.com/zama-ai/concrete) — Zama のコンパイラ
- [Lattigo](https://github.com/tuneinsight/lattigo) — Go。CKKS / BFV

## MPC — 秘密計算 (Secure Multi-Party Computation)

複数の参加者が自分の入力を明かさずに共同で計算する仕組み。各参加者の入力は他の参加者にも漏れない。計算結果は参加者間で共有される。

方式として Garbled Circuits、Secret Sharing ベース (Shamir 等)、Oblivious Transfer がある。

代表 OSS:

- [MP-SPDZ](https://github.com/data61/MP-SPDZ) — 多方式対応。研究用途で広く使われている
- [CrypTen](https://github.com/facebookresearch/CrypTen) — PyTorch 向け。Meta が開発
- [EMP-toolkit](https://github.com/emp-toolkit) — Garbled Circuits 中心

## ZKP — ゼロ知識証明 (Zero-Knowledge Proof)

ある主張が真であることを、その主張以外の情報を一切漏らさずに証明する仕組み。

方式の家族として zk-SNARK (Groth16, Plonk 等)、zk-STARK (透明 / 量子耐性寄り)、Bulletproofs がある。ブロックチェーンの Rollup で量産されている。

代表 OSS:

- [circom](https://github.com/iden3/circom) + [snarkjs](https://github.com/iden3/snarkjs) — 回路記述 DSL + JS 実装
- [arkworks](https://github.com/arkworks-rs) — Rust エコシステム
- [Halo2](https://github.com/zcash/halo2) — Zcash
- [gnark](https://github.com/Consensys/gnark) — Go。ConsenSys が開発
- [RISC Zero](https://github.com/risc0/risc0) — zkVM

## ABE — 属性ベース暗号 (Attribute-Based Encryption)

暗号文そのものに「誰が復号できるか」の条件 (属性ポリシー) を埋め込む暗号。KP-ABE (鍵側にポリシー) と CP-ABE (暗号文側にポリシー) がある。

計算はできない (暗号文のまま演算するものではない)。クラウドストレージのアクセス制御に使う提案は多いが、本番採用は限定的。

代表 OSS:

- [OpenABE](https://github.com/zeutro/openabe) — C++
- [Charm-Crypto](https://github.com/JHUISI/charm) — Python。ペアリング暗号含む教育・研究向け

## PIR — プライベート情報検索 (Private Information Retrieval)

データベースに対して、どのレコードを引いたかをサーバに知らせずに取得する仕組み。単一サーバ方式 (FHE ベースが主流) と複数サーバ方式 (非共謀前提) がある。

代表 OSS:

- [SealPIR](https://github.com/microsoft/SealPIR) — Microsoft。SEAL ベース
- [SimplePIR](https://github.com/ahenzinger/simplepir) — MIT (Henzinger et al.)
- [Spiral](https://github.com/menonsamir/spiral-rs) — Menon & Wu

自分の研究テーマ ([サーベイメモ](/notes/ja/2026-04-16-research-direction-fhe-pir)) の中心はここ。

## DP — 差分プライバシー (Differential Privacy)

個々のデータ点が結果にほとんど影響しないように、集計クエリにノイズを加える枠組み。「特定の人がデータセットに含まれていたかどうか」を統計的に秘匿する。

Central DP (信頼できるキュレーターがノイズを加える) と Local DP (各ユーザがローカルでノイズを加える) がある。US Census 2020 で使われたことが象徴的。

代表 OSS:

- [Google differential-privacy](https://github.com/google/differential-privacy) — C++ / Go / Java
- [OpenDP](https://github.com/opendp/opendp) — Harvard + Microsoft
- [Opacus](https://github.com/pytorch/opacus) — PyTorch 向け。DP-SGD
- [diffprivlib](https://github.com/IBM/differential-privacy-library) — IBM

## TEE — Trusted Execution Environment

ハードウェアで隔離された実行環境。暗号ではなくハードウェアを信頼の根 (root of trust) にする。Intel SGX / TDX、AMD SEV-SNP、Arm TrustZone / CCA、NVIDIA Confidential Computing (H100 等) がある。

本番運用されているが、ベンダ依存とサイドチャネル脆弱性の履歴 (Spectre, Foreshadow 等) は知っておくべき。

代表 OSS:

- [Gramine](https://github.com/gramineproject/gramine) — SGX 向けランタイム
- [Open Enclave](https://github.com/openenclave/openenclave) — Microsoft
- [Occlum](https://github.com/occlum/occlum) — LibOS

## 一次ソース

- FHE: [Gentry 2009 博士論文](https://crypto.stanford.edu/craig/) / [homomorphicencryption.org](https://homomorphicencryption.org/) (標準化コンソーシアム)
- MPC: Yao 1982 / 1986 (Garbled Circuits)
- ZKP: Goldwasser-Micali-Rackoff 1985
- ABE: Sahai-Waters 2005 / Bethencourt-Sahai-Waters 2007 (CP-ABE)
- PIR: Chor-Goldreich-Kushilevitz-Sudan 1995
- DP: Dwork-McSherry-Nissim-Smith 2006
- TEE: [Confidential Computing Consortium](https://confidentialcomputing.io/)
