---
title: "Tailscale で別ネットワークから自宅 Jetson に SSH できるようにする"
date: "2026-05-09"
excerpt: "前回セットアップした Jetson Orin Nano に、自宅 WiFi の外から SSH したい。ポート開放しない選択肢として Tailscale を入れ、Mac と Jetson を同じ tailnet に繋いで、別ネットワーク経由で SSH できるところまでの備忘録。"
tags:
  - Jetson
  - Tailscale
  - VPN
  - SSH
  - ネットワーク
  - やってみた
---

## はじめに — なぜやるか

[前回の記事](/notes/2026-05-08-jetson-orin-nano-setup) で Jetson Orin Nano をセットアップして、Mac から SSH で叩けるところまで来た。ただこれは **自宅 WiFi 内に Mac も Jetson もいる前提** で、会社や研究室 — つまり別ネットワークからは届かない。

外から繋ぎたい。長時間の推論を仕掛けて出かけたい、出先からログを見たい、というのは自宅 Jetson 運用の常識的なユースケース。

今回は **Tailscale** を入れて、別ネットワークから自宅 Jetson に SSH できる状態を作るところまでの備忘録。やったこと自体は「Mac と Jetson の両方に Tailscale を入れて同じアカウントでログイン」だけなんだけど、選択肢比較と「なぜそれを選んだか」を残しておきたかった。

## 選択肢の比較

自宅マシンに外から繋ぐ手段はいくつかある。

| 方法 | ポート開放 | セキュリティ | 設定の楽さ |
| --- | --- | --- | --- |
| Tailscale (WireGuard ベースのメッシュ VPN) | 不要 | ◎ | ◎ |
| Cloudflare Tunnel | 不要 | ◎ | ○ |
| ポートフォワーディング + DDNS | **必要** | △ (要対策) | △ |
| 踏み台 VPS + reverse SSH | 不要 | ○ | × |

ポートフォワーディングは古典的なやり方だが、SSH ポートをインターネット全域に晒すことになる。22 番を開けた瞬間から bot のスキャンが常時飛んでくるし、fail2ban を入れても根本的に「世界に開いている」事実は変わらない。AI Agent Security を専門にする人間がやる構成ではない。

→ **Tailscale を採用**。WireGuard ベースで暗号化済み、ポート開放不要、設定 10 分。

## Tailscale とは何か

ざっくり言うと:

- **WireGuard ベースのメッシュ VPN**
- 各デバイスにクライアントを入れて同じアカウントでログインすると、互いに `100.x.x.x` のプライベート IP で通信できる (この内部 IP 空間を **tailnet** と呼ぶ)
- NAT 越えは STUN / DERP relay で自動処理されるので、ルーター側の設定は不要
- 個人利用は無料枠 (3 ユーザー、100 デバイス) で十分

「自宅ネットワークと外出先ネットワークを、暗号化された専用線で直結したかのように見せる」というのが体感。

## JetKVM との違い (混同しがちな点)

最近 JetKVM のような IP-KVM 系プロダクトが流行っていて、これと Tailscale を混同しやすいので整理しておく。

- **SSH / Tailscale**: OS への リモートアクセス。シェル、ファイル、サービスを叩く。OS が起動していることが前提
- **JetKVM**: 物理マシンへのリモートアクセス。BIOS、ブート画面、カーネルパニック後、ネットワークが死んだ状態でも触れる

通常運用なら Tailscale で十分。JetKVM 系は「OS が壊れた・ネットワークが死んだ」時の最終手段としての保険なので、別軸で検討するもの。今回の目的 (外からの SSH) は Tailscale の範囲で完結する。

## 構築手順

### 1. Mac 側: Standalone 版をインストール

Tailscale には **App Store 版** と **Standalone 版** がある。公式は **Standalone 版を推奨** している。理由は、

- 機能が多い (Subnet routing 等は Standalone でしか使えない場面がある)
- 更新が App Store 審査を待たない
- VPN 競合検出ができる

なので、Standalone を選ぶ。

1. [https://tailscale.com/download/mac](https://tailscale.com/download/mac) から `.pkg` をダウンロード
2. インストール後、**システム設定 → 一般 → ログイン項目と機能拡張 → Network Extensions** で `Tailscale Network Extension` を ON
3. メニューバーの Tailscale アイコンから **Log in** → SSO 認証 (GitHub / Google など)

macOS の System Extension 許可を忘れると VPN が張られないので、ここは詰まりポイント。

### 2. Jetson 側: 公式スクリプトでインストール

Jetson (Ubuntu) 側はワンライナーで入る。

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

`tailscale up` を叩くと URL が表示されるので、それを手元のブラウザで開いて **Mac と同じアカウント** でログインする。これで Jetson も同じ tailnet に参加した状態になる。

### 3. 確認

Jetson 側で割り当てられた tailnet 内 IP を確認:

```bash
tailscale ip -4
# → 100.x.x.x が表示される
```

Mac 側から、その IP に SSH:

```bash
ssh gaku@100.x.x.x
```

→ **別ネットワークからでも繋がるようになる**。家の WiFi を切ってテザリングに切り替えて試すと、ちゃんと外からアクセスできていることが確認できる。

## あると便利な設定

最低限の SSH は上で動くが、いくつか積んでおくと運用が楽になる。

- **MagicDNS**: Tailscale の管理画面で Enable すると、IP じゃなくホスト名 (例: `ssh gaku@jetson`) で繋げる。IP を覚えなくていい
- **`~/.ssh/config` への登録**: `ssh jetson` だけで繋がるようにエイリアスを切る
- **動作確認は家にいるうちに**: 家の WiFi を切ってテザリングに切り替えて SSH してみる。出先で「繋がらない」と気付くと詰む
- **Tailscale SSH**: `sudo tailscale up --ssh` で鍵管理を Tailscale 側に寄せる方式に切り替えられる。ACL で誰がどのノードに SSH できるかを管理画面から制御できる

特に MagicDNS は最初に有効化しておくと体験が一段上がるので推奨。

## なぜ「ポート開放しない」を選ぶか

セキュリティの観点で書いておく。

ポートフォワーディングで 22 番を世界に開けると、

- 公開 IP に対して SSH ブルートフォースが常時飛んでくる
- 弱いパスワードや漏れた鍵があれば即侵入
- 仮に鍵運用が完璧でも、SSH デーモン自体の脆弱性 (例: regreSSHion のようなもの) が出た瞬間に攻撃面が露出する

Tailscale の場合、

- そもそも tailnet に参加していないデバイスからは Jetson が **存在自体見えない** (ICMP も通らない)
- 認証は SSO + デバイス承認の二段で、パスワードや鍵単独より強い
- 通信は WireGuard で暗号化済み

「公開すべきでないものを公開しない」というのは多層防御の最初の一枚であって、ここをサボらない選択肢が無料で取れる時代に、わざわざポート開放する理由はあまりない。

## ここまでで手に入った状態

- Mac と Jetson が同じ tailnet (`100.x.x.x`) に参加している
- 別ネットワークから Jetson に SSH できる
- ルーターの設定は何もいじっていない
- 22 番ポートは外に開いていない

セットアップは実質 30 分くらい。Jetson 運用の「外から触れない」問題が消えた。

## 次にやりたいこと

- **MagicDNS と `~/.ssh/config` の整備**: 今は IP 直打ちなので、ホスト名で繋げるようにする
- **Tailscale SSH への移行**: 鍵管理を Tailscale ACL に寄せて、管理画面から権限を制御できる状態にする
- **Tailscale Serve / Funnel**: Jetson 上で立てた Web UI (Ollama のフロントエンドなど) を、tailnet 内 or 限定的に公開できる仕組み。実験用に試したい
- **JetKVM 系の保険**: ファームウェア更新でネットワーク設定が飛んだ時のために、別軸の物理アクセス手段を検討する

## 参考

- [Tailscale 公式ドキュメント](https://tailscale.com/kb/)
- [Tailscale for macOS (Standalone)](https://tailscale.com/download/mac)
- [Tailscale SSH](https://tailscale.com/kb/1193/tailscale-ssh/)
- [MagicDNS](https://tailscale.com/kb/1081/magicdns/)
