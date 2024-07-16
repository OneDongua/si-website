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
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/Onedongua/si-website/tree/main/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/Onedongua/si-website/tree/main/",
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
      logo: {
        alt: "Logo",
        src: "img/logo.png",
      },
      items: [
        { to: "sign_up", label: "🔥报名", position: "left" },
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "文档",
        },
        { to: "/blog", label: "博客", position: "left" },
        { to: "about_us", label: "关于", position: "right" },
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
