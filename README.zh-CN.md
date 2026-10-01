# 四语言企业网站示例

[English](README.md) | [简体中文](README.zh-CN.md) | [日本語](README.ja.md) | [繁體中文](README.zh-HK.md)

无需第三方依赖的静态网站，提供英文、简体中文、日文及繁体中文。每种语言都有首页、产品表和本地询盘草稿，共 12 个 HTML 页面及 8 份对应语言的型号说明。

## 运行

需要 Node.js 20 或更新版本，无需安装依赖包。

```sh
git clone https://github.com/awesomellm/multilingual-website-starter.git
cd multilingual-website-starter
node --test starter.test.mjs
node build.mjs --origin https://example.com
node server.mjs
```

打开 `http://127.0.0.1:4178/`，服务器仅监听本机。部署前把构建域名换成实际公开域名，再将 `dist/` 内容交给支持目录 `index.html` 的托管服务。HTTPS、域名路由和真实错误响应由托管环境配置。

## 已包含的行为

- 语言切换打开对应内容页，产品页和询盘页也保持页面身份。
- 每页都有对应语言的标题、描述、HTML 语言、自身规范 URL 及互相对应的语言地址。
- `x-default` 指向对应英文页，不会把所有页面都指回首页。
- 网站地图包含全部 12 页，产品下载资料与当前页面语言一致。
- 选择产品会把型号带入询盘，浏览器检查必填字段。
- 表单只生成本地文本草稿，不发送邮件、不请求接收服务，也不显示已收到询盘。

## 修改内容

在 `site-data.mjs` 中替换已审核的翻译及规格。`pageIds` 表示稳定内容身份，`pathFor` 将同一身份映射到各语言地址。新增页面时，先完成计划发布的语言版本，再提供语言切换。[结构与验收说明](ARCHITECTURE.zh-CN.md) 解释映射及部署边界。

型号、尺寸、起订量和交期均为虚构示例，业务使用前须替换为已确认资料。接入接收服务前，先定义实际接收、失败处理和数据保留方式。

## 配套项目

[静态 SEO 检查器](https://github.com/awesomellm/website-seo-checker/blob/main/README.zh-CN.md) · [交付模板](https://github.com/awesomellm/website-migration-kit/blob/main/README.zh-CN.md)

[Google 多语言页面说明](https://developers.google.com/search/docs/specialty/international/localized-versions?hl=zh-CN)

由 [ZequnWeb 中文网站](https://zequnweb.com/zh/) 维护，采用 MIT 许可证（`LICENSE`）。
