# 內容身分、URL 與驗收

[English](ARCHITECTURE.md) | [简体中文](ARCHITECTURE.zh-CN.md) | [日本語](ARCHITECTURE.ja.md) | [繁體中文](ARCHITECTURE.zh-HK.md)

`products` 是一個內容身分，對應 `/products/`、`/zh/products/`、`/jp/products/` 與 `/zh-hk/products/`。語言選單與搜尋語言地址都由這個身分產生，所以切換語言不會丟失目前頁面。

## 輸出約定

`site-data.mjs` 保存翻譯與虛構規格；`build.mjs` 對可見文字轉義、輸出 HTML，並產生各語言文字資料、網站地圖及抓取檔案。`styles.css` 提供響應式配置。`server.mjs` 是本機靜態預覽，不是正式查詢接收服務。

如果某種語言尚未有對應文章，應在真實翻譯審核完成前省略該對應關係。本示例的三個內容身分均提供完整四語言版本。

## 驗收步驟

1. 使用實際公開網域建置，檢查產品頁標準地址是否包含正確語言路徑。
2. 從日文產品頁切換至簡體中文，確認仍然停留在產品頁。
3. 下載各型號資料，確認可見語言及型號與頁面一致。
4. 選擇 `DEMO-02` 並開啟查詢頁，確認保留所選型號。
5. 先留空必填欄位，再填虛構資料並產生草稿，確認沒有已傳送或已接收的表述。
6. 部署後檢查實際 URL、目錄存取、HTTPS 及錯誤回應，本機測試不能證明託管行為。

## 接收真實查詢

以明確設計的接收流程替換本機草稿。普通 HTTP 200、點擊按鈕或開啟郵件應用程式，都不足以證明收到查詢。驗證匹配的提交識別及接收端回執，再確認企業可以查看並回覆訊息。[查詢驗收表](https://github.com/awesomellm/website-migration-kit/blob/main/inquiry-acceptance.zh-HK.csv)。
