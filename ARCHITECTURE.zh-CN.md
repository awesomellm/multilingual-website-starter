# 内容身份、URL 与验收

[English](ARCHITECTURE.md) | [简体中文](ARCHITECTURE.zh-CN.md) | [日本語](ARCHITECTURE.ja.md) | [繁體中文](ARCHITECTURE.zh-HK.md)

`products` 是一个内容身份，对应 `/products/`、`/zh/products/`、`/jp/products/` 和 `/zh-hk/products/`。语言菜单及搜索语言地址都由这个身份生成，所以切换语言不会丢失当前页面。

## 输出约定

`site-data.mjs` 保存翻译与虚构规格；`build.mjs` 对可见文本转义、输出 HTML，并生成各语言文本资料、网站地图和抓取文件。`styles.css` 提供响应式布局。`server.mjs` 是本地静态预览，不是生产询盘接收服务。

如果某种语言还没有对应文章，应在真实翻译审核完成前省略该对应关系。本示例的三个内容身份均提供完整四语言版本。

## 验收步骤

1. 使用实际公开域名构建，检查产品页规范地址是否包含正确语言路径。
2. 从日文产品页切换到简体中文，确认仍然停留在产品页。
3. 下载各型号资料，确认可见语言和型号与页面一致。
4. 选择 `DEMO-02` 并打开询盘页，确认保留所选型号。
5. 先留空必填字段，再填虚构资料并生成草稿，确认没有已发送或已接收的表述。
6. 部署后检查实际 URL、目录访问、HTTPS 和错误响应，本地测试不能证明托管行为。

## 接收真实询盘

用明确设计的接收流程替换本地草稿。普通 HTTP 200、点击按钮或打开邮件应用，都不足以证明收到询盘。验证匹配的提交标识与接收端回执，再确认企业可以查看并回复消息。[询盘验收表](https://github.com/awesomellm/website-migration-kit/blob/main/inquiry-acceptance.zh-CN.csv)。
