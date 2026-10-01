# Content identities, URLs and acceptance

[English](ARCHITECTURE.md) | [简体中文](ARCHITECTURE.zh-CN.md) | [日本語](ARCHITECTURE.ja.md) | [繁體中文](ARCHITECTURE.zh-HK.md)

`products` is one content identity. Its URLs are `/products/`, `/zh/products/`, `/jp/products/` and `/zh-hk/products/`. The language menu and search alternates derive from this identity, so changing a language does not discard the current page.

## Output contract

`site-data.mjs` holds translations and fictional specifications. `build.mjs` escapes visible text, renders HTML and generates per-language text downloads, sitemap and robots. `styles.css` provides responsive layout. `server.mjs` is a local static preview, not a production receiving service.

To support a language without an equivalent article, omit that alternate until an actual reviewed translation exists. This starter intentionally provides complete translations of all three page identities.

## Acceptance walkthrough

1. Build with the intended public origin. Check the canonical on a product page, including its locale path.
2. Switch from a Japanese product page to Simplified Chinese. Confirm the product page remains selected.
3. Download each model note and confirm the visible language and model match.
4. Choose `DEMO-02`, open the inquiry page and confirm the selected model is retained.
5. Leave required fields empty, then enter fictional data and generate a draft. Confirm there is no receipt or sent claim.
6. After deployment, test actual URLs, directory handling, HTTPS and error responses. The local tests do not prove hosting behavior.

## Receiving real inquiries

Replace the local draft with an explicitly designed receiving flow. A normal HTTP 200, a button click or opening an email client is not sufficient evidence of receipt. Validate a matching submission identifier and a receipt from the receiver, then confirm the business can retrieve and respond to the message. [Inquiry acceptance worksheet](https://github.com/awesomellm/website-migration-kit/blob/main/inquiry-acceptance.csv).
