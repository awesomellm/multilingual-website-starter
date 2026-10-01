# 四言語の企業サイトひな型

[English](README.md) | [简体中文](README.zh-CN.md) | [日本語](README.ja.md) | [繁體中文](README.zh-HK.md)

外部依存のない静的サイトです。英語、簡体字中国語、日本語、繁体字中国語それぞれにホーム、製品表、ローカルの問い合わせ下書きを用意します。HTML は 12 ページ、型番資料は八つです。

## 実行

Node.js 20 以降を使います。パッケージのインストールは不要です。

```sh
git clone https://github.com/awesomellm/multilingual-website-starter.git
cd multilingual-website-starter
node --test starter.test.mjs
node build.mjs --origin https://example.com
node server.mjs
```

`http://127.0.0.1:4178/` を開きます。サーバーは手元の端末だけで待ち受けます。公開前に実際の公開ドメインへ変更し、ディレクトリ内の `index.html` を配信できる環境に `dist/` の内容を置きます。HTTPS、ドメインの振り分け、実際のエラー応答は配信先で設定します。

## 含まれる動作

- 言語切り替えは同じ内容のページを開き、製品と問い合わせのページ識別も維持します。
- 各ページに翻訳したタイトル、説明、HTML 言語、自己正規 URL、相互の言語対応を出力します。
- `x-default` は対応する英語ページを示し、すべてをホームへ向けません。
- サイトマップは全 12 ページを含み、製品資料は表示中の言語と一致します。
- 選択した型番を問い合わせに渡し、必須項目をブラウザーが検査します。
- フォームはローカルの下書きだけを作ります。メール送信、受信サービスへの通信、受信済み表示はしません。

## 内容の変更

`site-data.mjs` に確認済みの翻訳と仕様を入力します。`pageIds` は安定した内容の識別子で、`pathFor` が言語別 URL に対応させます。ページを追加する際は、予定する言語の本文を完成させてから切り替えリンクを出します。[構造と検収](ARCHITECTURE.ja.md) で対応関係と公開範囲を説明しています。

型番、寸法、最低注文数量、納期は架空の例です。業務に使う前に承認済み情報へ置き換えてください。受信サービスの接続前に、受領確認、失敗処理、保存期間を定めます。

## 関連プロジェクト

[静的 SEO チェックツール](https://github.com/awesomellm/website-seo-checker/blob/main/README.ja.md) · [納品テンプレート](https://github.com/awesomellm/website-migration-kit/blob/main/README.ja.md)

[Google の言語別ページ資料](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=ja)

[ZequnWeb 日本語サイト](https://zequnweb.com/jp/) が保守します。MIT ライセンス（`LICENSE`）。
