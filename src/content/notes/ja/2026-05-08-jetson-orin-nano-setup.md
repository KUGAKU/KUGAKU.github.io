---
title: "Jetson Orin Nano Super を買って、ローカル LLM が動くところまで"
date: "2026-05-08"
excerpt: "Edge AI Security の研究のために Jetson Orin Nano Super 開発者キットを買った。秋月で本体、Amazon で周辺機器を揃えて、microSD に JetPack を焼いて、ファームを上げて、Ollama でローカル LLM が動くところまでの記録。"
tags:
  - Jetson
  - Edge AI
  - ローカル LLM
  - Ollama
  - セットアップ
  - やってみた
---

## はじめに — なぜ買ったか

**Edge AI Security の研究をやってみたい**、というのが動機。これまでの経験からこの領域はやれそうだし、興味もあるという段階。脅威の視点はいくつもあるが、まずは現物を触りながら **手触り感を確かめておきたい** と思った。論文だけ読んでいてもピンと来ない領域なので、ハードを 1 個手元に置いておくところから始めることにした。

選んだのは [NVIDIA Jetson Orin Nano Super 開発者キット](https://akizukidenshi.com/catalog/g/g130325/)。Super 版で MAXN モード対応、8GB メモリ、それなりの推論性能、というあたりで研究の最初の踏み台としてはちょうどいい。秋月電子で税込 ¥52,800 だった。

このメモは、箱を開けて電源を探すところから、Ollama でローカル LLM が走るところまで、自分が引っかかった点も含めて時系列で残しておくもの。NVIDIA / Jetson AI Lab の一次情報の場所も合わせて貼る。

## 買ったもの

| 種別 | 商品 | 購入先 | 備考 |
| --- | --- | --- | --- |
| 本体 | [NVIDIA Jetson Orin Nano Super 開発者キット](https://akizukidenshi.com/catalog/g/g130325/) | 秋月電子 | DC アダプタは同梱 |
| microSD | [SanDisk Extreme PRO microSDXC 128GB](https://www.amazon.co.jp/dp/B0BNQTCKN6) | Amazon | 初回起動の OS 焼き込み用。これがないと始まらない |
| 映像ケーブル | [DisplayPort ケーブル](https://www.amazon.co.jp/dp/B0G4LG7CF5) | Amazon | **DP なので注意**。HDMI だと思い込んでいて、危うく刺さらないやつを買うところだった |
| 電源変換 | [サンワサプライ 3P→2P 変換アダプタ TAP-AD8BK](https://www.amazon.co.jp/dp/B01N29BF7B) | Amazon | DC アダプタの AC プラグが **3P** なので、日本の 2P コンセントに挿すには変換が必要 |
| ストレージ | [NVMe SSD](https://www.amazon.co.jp/dp/B0B55SWRCY) | Amazon | 後で OS 移行/データ用に。今回はまだ装着していない |
| 付属品的なもの | [周辺アクセサリ](https://www.amazon.co.jp/dp/B0875TG95Z) | Amazon | — |

キーボードとマウスは手元のものを流用したので省略。ディスプレイも同様。

**地味に詰まりやすい買い物の罠** が 2 個あったのでメモしておく。

- **DisplayPort 問題**: Jetson Orin Nano Developer Kit の映像出力は DisplayPort。私は最初なんとなく HDMI だと思っていた。出力ポートを確認してから映像ケーブルを買うこと
- **3P プラグ問題**: 同梱の DC アダプタの AC 側が 3P (アース付き)。日本の家庭用コンセントは 2P なので、3P → 2P 変換アダプタを別途買う必要がある

## JetPack 6.2 を microSD に焼く

公式の流れは Jetson AI Lab の [Initial Setup Guide for Jetson Orin Nano Developer Kit](https://www.jetson-ai-lab.com/tutorials/initial-setup-jetson-orin-nano/) にまとまっている。x86 Ubuntu PC を使わずに **microSD だけで完結させる** ルートを選んだ。

NVMe SSD に OS を入れたい場合は SDK Manager (x86 Ubuntu PC が必要) を使うルートになるが、Apple Silicon Mac しか手元にないので一旦この道は保留にした。とりあえず microSD で立ち上げて、研究の本筋を動かし始めるのを優先。

### 焼くもの

- [JetPack 6.2.1 SD カードイメージ](https://developer.nvidia.com/downloads/embedded/L4T/r36_Release_v4.4/jp62-r1-orin-nano-sd-card-image.zip) (Orin Nano 用、`jp62-r1-orin-nano-sd-card-image.zip`)
- [Balena Etcher](https://etcher.balena.io/) (microSD 書き込みツール)

zip のまま Etcher に渡すと自動で展開して書き込んでくれる。10〜20 分くらい。

![Balena Etcher で JetPack 6.2 SD カードイメージの書き込みが完了した画面。Effective speed: 80.4 MB/s で Successful target 1。](/images/notes/2026-05-08-jetson-orin-nano-setup/etcher-completed.png)

### ファームの新旧で分岐がある (重要)

Jetson Orin Nano は工場出荷時の **UEFI ファームウェアが古いと、JetPack 6.x の SD カードを挿しても起動しない** という罠がある。古い場合は、

1. JetPack 5.1.3 SD で起動 → 裏でファーム更新が予約される
2. リブートで Firmware が 35.5.0 へ
3. QSPI Updater を入れてもう 1 回リブート
4. JetPack 6.2 SD に差し替えて起動 → 再度ファーム更新
5. リブートで Firmware が 36.4.3 へ

という遠回りが必要になる (詳細は [公式 Initial Setup Guide](https://www.jetson-ai-lab.com/tutorials/initial-setup-jetson-orin-nano/))。

ガイドには「**古いファームのまま JetPack 6.x SD で何度もブートを試みると、L4T launcher が壊れて常に recovery kernel で起動する状態になる**」という警告もあった。なので、

- 起動時に NVIDIA ロゴが出たら **Esc 連打** で UEFI Setup Menu に入り、Firmware バージョンを確認する
- 36.0 未満なら 5.1.3 ルート、36.0 以上ならいきなり 6.2 でいける

というのが本来の流れ。

私は SD カードが手元に 1 枚しかなかったので、**いきなり JetPack 6.2 を焼いて様子を見る** という賭けに出た。最近出荷されたロットなら新しい可能性も十分あるという読み。

## 起動 — UEFI Shell 落ちと、SD 入れたら一発で動いた話

電源を入れて最初に出たのが **UEFI Interactive Shell** の画面だった。これは「ブートできる OS が見つからなかったので最終手段の Shell が起動した」状態で、

- SD カードがそもそも挿さっていなかった
- SD カードに OS が焼かれていなかった

のどちらかが原因。私の場合は **そもそも SD カードを挿していなかった** だけだった (落ち着け、マジでw)。

SD への JetPack 6.2 の書き込みが終わったので、

1. DC アダプタを抜いて電源を切る
2. microSD を Jetson の SD スロットに挿す
3. DC アダプタを挿し直して起動

これで Ubuntu の `oem-config` (初期セットアップ) 画面が立ち上がった。**ファームが新しい個体だった**、ということになる。3 分以内にデスクトップ系の画面が出れば勝ち、という判定基準が公式ガイドに書いてあった。

`oem-config` ではタイムゾーン・ユーザー名・パスワードなどを設定して、最後に Chromium のインストールが走る。「chromium installation is finished」のダイアログが出たら **Close** → **Continue** で次へ進む。

![机の上の Jetson Orin Nano Developer Kit 本体と、モニタに表示された oem-config の Chromium インストール完了ダイアログ。](/images/notes/2026-05-08-jetson-orin-nano-setup/desk-oem-config.jpg)

## ファームウェアアップデート (36.4.3 へ)

`oem-config` を完了して再起動すると、**起動の途中で勝手にファームウェア更新が始まる**。

```
Jetson System firmware version 36.4.3
Update Progress - 6%
```

みたいな黒画面が出てプログレスバーが進むやつ。これは `nv-l4t-bootloader-config` というサービスが裏で更新を予約していて、リブート時に実行される、という仕組み。

![NVIDIA ロゴを背景に、Jetson System firmware version 36.4.3-gcid-38968081 と Update Progress 6% が表示されているファームウェアアップデート画面。](/images/notes/2026-05-08-jetson-orin-nano-setup/firmware-update.jpg)

**ここで電源を絶対に切らない**。文鎮化のリスクがある。100% まで数分〜10 分くらい、ひたすら待つ。

完了すると自動で再起動してデスクトップに入る。これで Firmware 36.4.3、JetPack 6.2 起動、というところまで来た。

## MAXN SUPER モードに切り替え

JetPack 6.2 のデフォルト電力モードは 25W。Super 版の本領は **MAXN SUPER モード** で出るので、ここを切り替える。

デスクトップ右上のステータスバーにある NVIDIA アイコン → **Power mode** → **MAXN SUPER** を選ぶ。再起動を求められるので再起動。

確認はターミナルから:

```bash
sudo nvpmodel -q
```

`NV Power Mode: MAXN_SUPER` と出れば OK。

研究文脈での補足: **電力モードの選択は実験条件そのもの** になる。サイドチャネル測定 (電力解析・EM 解析) を考えるなら、25W と MAXN SUPER で電力プロファイルが大きく変わるので、どちらで測定するかは論文に書く必要があるはず。今回はとりあえず性能側に倒したかったので MAXN SUPER で進める。同様の理由で **ファームウェアのバージョンも記録しておくべき** で、`sudo nvbootctrl dump-slots-info` で取れる。

## SSH を有効化して Mac から繋ぐ

ここまでは Jetson 直結のディスプレイ + キーボードで作業していたが、いい加減 Mac から触りたい。SSH を有効化する。

Jetson 側 (デフォルトで `openssh-server` は入っている):

```bash
sudo systemctl enable --now ssh
```

IP を確認する。Wi-Fi で繋いでいるなら `wlan0`、有線なら `eth0` の `inet` 行を見る。`ip a` だと色々出て見づらいので、

```bash
hostname -I
```

の方が早い。スペース区切りで IP だけ出る。

Mac 側から:

```bash
ssh <ユーザー名>@<Jetson の IP>
```

初回は known_hosts への追加 (`yes`) と、Jetson のパスワード入力。ここまで来ると **モニタとキーボードを片付けて、普段の Mac の作業環境から Jetson を叩ける** ようになる。生活が一気に楽になるポイント。

## Ollama でローカル LLM を動かす

セットアップとしてはここがゴール。「Jetson 買ってローカル AI 動かしましたマン」を名乗れる状態にする。

参考: [Ollama on Jetson | Jetson AI Lab](https://www.jetson-ai-lab.com/tutorials/ollama)。Jetson Orin Nano 8GB は公式サポート対象。

### インストール (1 行)

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

CUDA サポート版が自動で入る。完了するとサーバが起動した状態になる (`http://localhost:11434` で待機)。

### 軽量モデルを動かす

公式は NVMe SSD 推奨と言っているが、microSD のままでも小さいモデルなら問題ない。**Llama 3.2 3B** (約 2GB) を選んだ。

```bash
ollama run llama3.2
```

初回はモデルのダウンロードで数分。完了すると `>>> Send a message` のプロンプトが出る。

```
>>> こんにちは、自己紹介してください
>>> Jetson Orin Nano って知ってる？
>>> /bye
```

`/bye` で抜ける。

### ゴリゴリ速かった

正直、これくらいのサイズの基板でこの速度が出ることに **ちょっと感動した**。

- 5cm × 9cm くらいの小さい基板の上で 30 億パラメータの LLM が走っている
- データは 1 bit もクラウドに出ていない (ネット切っても動く)
- レイテンシはネットワーク往復ゼロなので、API より速い場面すらある

### tegrastats で GPU が回ってるところを観察

別ターミナルから:

```bash
sudo tegrastats
```

を流しっぱなしにしておいて、Ollama 側で長めの質問を投げると、`GR3D_FREQ` (GPU 周波数使用率) が **0% → 99% に跳ね上がる** のが見える。電力 (`VDD_IN`) も連動して跳ねる。「今、自分の Jetson の GPU が LLM 推論をしている」という物理的な証拠で、見ていて楽しい。

### 推論速度を数値で出す

`--verbose` を付けて起動すると、応答ごとに `eval rate: XX tokens/s` が表示される。

```bash
ollama run llama3.2 --verbose
```

体感の「ゴリゴリ速い」を数値で記録しておけるので、研究やブログ用のベンチマークに使える。MAXN SUPER + Llama 3.2 3B + microSD でこれくらい、という基準値が手元にできた。

## ここまでで手に入った状態

- Jetson Orin Nano Super、JetPack 6.2、Firmware 36.4.3、MAXN SUPER
- Mac から SSH で叩ける
- Ollama でローカル LLM がストレスなく動く

セットアップとしてはここまで。「箱を開ける」から「ローカル LLM が走る」までで、2時間くらい。

## 次にやりたいこと

- **NVMe SSD への OS 移行**: 今は microSD で動かしているが、研究で本格的にデータ・モデル・ログを扱い始めると I/O が律速になる。SDK Manager 経由で NVMe-only 構成にするか、SSD をデータ専用にして共存させるかは要検討
- **電力測定の物理セットアップ**: シャント抵抗 + オシロスコープ、または既製の power analyzer。サイドチャネル研究の入口
- **攻撃対象モデルの選定**: 今動かしている Llama 3.2 3B がそのまま実験対象になり得る。CNN 系 (ResNet / MobileNet) も含めて、ハードウェア攻撃 (サイドチャネル / フォルトインジェクション / モデル抽出) の文脈で何を狙うか整理する

研究の方向性として **Edge LLM のハードウェアセキュリティ** はまだ十分耕されていない領域だと感じているので、ここから少しずつ詰めていきたい。

## 参考

- [Initial Setup Guide for Jetson Orin Nano Developer Kit | Jetson AI Lab](https://www.jetson-ai-lab.com/tutorials/initial-setup-jetson-orin-nano/)
- [Ollama on Jetson | Jetson AI Lab](https://www.jetson-ai-lab.com/tutorials/ollama)
- [SSD + Docker Setup | Jetson AI Lab](https://www.jetson-ai-lab.com/tutorials/ssd-docker-setup) (今回は未実施)
- [JetPack 6.2.1 SD カードイメージ (Orin Nano)](https://developer.nvidia.com/downloads/embedded/L4T/r36_Release_v4.4/jp62-r1-orin-nano-sd-card-image.zip)
- [Balena Etcher](https://etcher.balena.io/)
