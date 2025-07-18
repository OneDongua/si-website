# si-website

一个使用 [Docusaurus](https://docusaurus.io/zh-CN/) 和 [TypeScript](https://www.typescriptlang.org/zh/) 构建的网站，通过 [Cloudflare Functions](https://developers.cloudflare.com/pages/functions/) 和 [Cloudflare KV](https://developers.cloudflare.com/kv/) 作为无服务器后端，同时借助 AI 转换出了采用 [Express](https://expressjs.com/) 构建的后端.

## 维护指南

### 快速开始

#### 0. 安装软件

- [Git](https://git-scm.com/downloads)

- [Node.js](https://nodejs.org/zh-cn)

- [VSCode](https://code.visualstudio.com/)
  (没有中文？扩展中安装简体中文扩展即可)

#### 1. 克隆 (Clone) 仓库

建议跟随 VSCode 指引克隆项目

#### 2. 安装依赖

打开项目，在 VSCode 终端输入：

```bash
npm install && cd server && npm install
```

#### 3. 运行项目

```bash
npm run start
```

#### 4. 构建网站
``` bash
npm run build
```

#### 5. 启动服务器 (前后端)
```bash
npm run server
```

#### 6. 托管到 Cloudflare Pages
 1. Fork 本项目 > 进入 [Cloudflare 仪表盘](https://dash.cloudflare.com/) > (注册账号) > 进入计算 (Workers) > Workers 和 Pages > 创建 > Pages > 导入现有 Git 存储库 > 选择本项目 > 框架预设选择 Docusaurus > 保存并部署
 2. [Cloudflare 仪表盘](https://dash.cloudflare.com/) > 存储和数据库 > KV > 新建 > 按表格“值”创建 > Pages > 设置 > 绑定 > 添加 > KV 命名空间 > 按表格添加

| 类型         | 名称        | 值              |
|--------------|-------------|-----------------|
| KV 命名空间 | CODE        | si-registerCode |
| KV 命名空间 | DATA        | si-data         |
| KV 命名空间 | PART_LIST   | si-participants |
| KV 命名空间 | QA          | si-qa           |
| KV 命名空间 | USERS       | si-users        |
| KV 命名空间 | VOTE        | si-vote         |

### 你大概率需要经常用到的文档

#### TypeScript

[TypeScript 中文手册](https://www.tsdev.cn/basic-types.html)

[TypeScript 菜鸟教程](https://www.runoob.com/typescript/ts-basic-syntax.html)

#### React

[React 中文文档](https://zh-hans.react.dev/learn)

#### CSS

[MDN CSS 官方文档](https://developer.mozilla.org/zh-CN/docs/Learn/CSS)

#### Docusaurus

[Docusaurus 文档](https://docusaurus.io/zh-CN/docs/)

- [Docusaurus 核心](https://docusaurus.io/zh-CN/docs/category/guides)

- [Docusaurus 配置](https://docusaurus.io/zh-CN/docs/api/docusaurus-config)

- [Docusaurus Swizzling](https://docusaurus.io/zh-CN/docs/swizzling)

#### Infima

[Infima 文档](https://infima.dev/docs/getting-started/introduction)

#### Git

[Git 菜鸟教程](https://www.runoob.com/git/git-tutorial.html)

[Git 速查表](https://ndpsoftware.com/git-cheatsheet.html)
(上方有中文)

### 它们之间的关系？

**Docusaurus(模板)** 是一个基于 **React(框架)** 的静态网站生成器，它支持使用 **TypeScript(语言)** 编写，并使用 **Infima(组件库)** 作为 CSS 框架。
