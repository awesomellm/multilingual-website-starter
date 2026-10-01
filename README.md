# Multilingual business website starter

[English](README.md) | [简体中文](README.zh-CN.md) | [日本語](README.ja.md) | [繁體中文](README.zh-HK.md)

A dependency-free static site with English, Simplified Chinese, Japanese and Traditional Chinese pages. It includes a homepage, product table and local inquiry draft in each language: 12 HTML pages and eight localized model notes.

## Run it

Use Node.js 20 or newer. No package installation is needed.

```sh
git clone https://github.com/awesomellm/multilingual-website-starter.git
cd multilingual-website-starter
node --test starter.test.mjs
node build.mjs --origin https://example.com
node server.mjs
```

Open `http://127.0.0.1:4178/`. The server listens only on your computer. Replace the build origin with your real public origin before deployment. Copy the contents of `dist/` to a host that serves directory `index.html` files; configure HTTPS, domain routing and actual error responses at that host.

## Included behavior

- Language switches open the equivalent page, including product and inquiry pages.
- Each page has a localized title, description, HTML language, self canonical and reciprocal language alternates.
- `x-default` points to the equivalent English page, not always to the homepage.
- The sitemap includes all 12 pages. Product downloads use the same language as their page.
- Selecting a product passes its model to the inquiry form. Required fields are checked by the browser.
- The form creates a local text draft. It does not send email, contact a service or claim successful receipt.

## Change the content

Edit `site-data.mjs` for actual reviewed translations and specifications. Keep `pageIds` as stable content identities; `pathFor` maps the same identity to a locale URL. Add a new page in every intended language before exposing its language links. [Architecture and acceptance checks](ARCHITECTURE.md) explain the mapping and deployment boundary.

The model identifiers, dimensions, MOQ and lead times are invented. Replace them with approved data before using the site for a business. Connect a receiving service only after defining receipt, failure handling and data retention.

## Companion projects

[Static SEO checker](https://github.com/awesomellm/website-seo-checker/blob/main/README.md) · [Delivery templates](https://github.com/awesomellm/website-migration-kit/blob/main/README.md)

[Google language-page documentation](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=en)

Maintained by [ZequnWeb](https://zequnweb.com/). MIT license (`LICENSE`).
