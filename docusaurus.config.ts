import { themes as prismThemes } from "prism-react-renderer";

import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "智能信息社",
  tagline: "你所热爱的，尽在此处",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://si-hzyz.pages.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "OneDongua", // Usually your GitHub org/user name.
  projectName: "si-website", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          exclude: ["**/*.test.*"],
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/Onedongua/si-website/tree/main/",
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: "所有博客",
          blogSidebarCount: "ALL",
          sortPosts: "descending", // "ascending" 升序 / "descending" 降序
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/Onedongua/si-website/tree/main/",
          onInlineAuthors: "ignore",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "智能信息社",
      hideOnScroll: true,
      logo: {
        alt: "Logo",
        src: "img/logo.png",
      },
      items: [
        { to: "vote", label: "投票", position: "left" },
        { to: "sign_up", label: "报名", position: "left" },
        { to: "qa", label: "Q&A", position: "left" },
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "文档",
        },
        { to: "blog", label: "博客", position: "left" },
        //{ to: "members", label: "成员", position: "left" },
        {
          to: "about_us",
          label: "关于",
          position: "right",
        },
        {
          href: "https://github.com/OneDongua/si-website",
          className: "header-github-link",
          position: "right",
        },
      ],
    },
    footer: {
      style: "light",
      links: [
        {
          title: "管理",
          items: [
            {
              label: "后台入口",
              to: "backend",
            },
            {
              label: "邮箱",
              href: "https://mail.si-hzyz.top",
            },
            {
              label: "抽奖器",
              href: "https://draw.si-hzyz.top",
            },
          ],
        },
        {
          title: "惠州一中",
          items: [
            {
              label: "官网",
              href: "http://www.hzyz.net",
            },
            {
              label: "YOJ",
              href: "http://oj.hzyz.net",
            },
          ],
        },
        {
          title: "一些东西",
          items: [
            {
              label: "百度",
              href: "https://www.baidu.com",
            },
            {
              label: "必应",
              href: "https://www.bing.com",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 惠州一中智能信息社. Built with Docusaurus. Powered by Cloudflare Pages.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
