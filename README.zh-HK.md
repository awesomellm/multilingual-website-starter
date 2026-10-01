# 四語言企業網站示例

[English](README.md) | [简体中文](README.zh-CN.md) | [日本語](README.ja.md) | [繁體中文](README.zh-HK.md)

毋須第三方相依套件的靜態網站，提供英文、簡體中文、日文及繁體中文。每種語言都有首頁、產品表及本機查詢草稿，共 12 個 HTML 頁面與 8 份對應語言的型號說明。

## 執行

需要 Node.js 20 或更新版本，毋須安裝相依套件。

```sh
git clone https://github.com/awesomellm/multilingual-website-starter.git
cd multilingual-website-starter
node --test starter.test.mjs
node build.mjs --origin https://example.com
node server.mjs
```

開啟 `http://127.0.0.1:4178/`，伺服器只監聽本機。部署前把建置網域換成實際公開網域，再將 `dist/` 內容交給支援目錄 `index.html` 的託管服務。HTTPS、網域路由及真實錯誤回應由託管環境設定。

## 已包含的行為

- 語言切換開啟對應內容頁，產品頁與查詢頁也保持頁面身分。
- 每頁都有對應語言的標題、描述、HTML 語言、自身標準 URL 及互相對應的語言地址。
- `x-default` 指向對應英文頁，不會將所有頁面都指回首頁。
- 網站地圖包含全部 12 頁，產品下載資料與目前頁面語言一致。
- 選擇產品會將型號帶入查詢，由瀏覽器檢查必填欄位。
- 表格只產生本機文字草稿，不傳送電郵、不請求接收服務，也不顯示已收到查詢。

## 修改內容

在 `site-data.mjs` 替換已審核的翻譯與規格。`pageIds` 代表穩定內容身分，`pathFor` 將同一身分映射至各語言地址。新增頁面時，先完成計劃發佈的語言版本，再提供語言切換。[結構與驗收說明](ARCHITECTURE.zh-HK.md) 解釋映射及部署邊界。

型號、尺寸、最低訂購量及交期均為虛構示例，業務使用前須替換為已確認資料。接入接收服務前，先定義實際接收、失敗處理及資料保留方式。

## 配套項目

[靜態 SEO 檢查器](https://github.com/awesomellm/website-seo-checker/blob/main/README.zh-HK.md) · [交付模板](https://github.com/awesomellm/website-migration-kit/blob/main/README.zh-HK.md)

[Google 多語言頁面說明](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh-TW)

由 [ZequnWeb 繁體中文網站](https://zequnweb.com/zh-hk/) 維護，採用 MIT 授權（`LICENSE`）。
