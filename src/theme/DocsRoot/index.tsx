import clsx from "clsx";
import React from "react";
import { useCookies } from "react-cookie";

import BrowserOnly from "@docusaurus/BrowserOnly";
import renderRoutes from "@docusaurus/renderRoutes";
import { HtmlClassNameProvider, ThemeClassNames } from "@docusaurus/theme-common";
import Layout from "@theme/Layout";

import styles from "./styles.module.css";

import type { Props } from "@theme/DocVersionRoot";
function accessDeny() {
  return (
    <div className={clsx(styles.accessDeny, "alert alert--danger")}>
      ❌ 您没有权限查看该目录 请
      <BrowserOnly fallback={<>登录</>}>
        {() => <a href="/backend?jumpto=/docs/intro">登录</a>}
      </BrowserOnly>
    </div>
  );
}

export default function DocsRoot(props: Props): JSX.Element {
  const [cookies, setCookie, removeCookie] = useCookies();
  const isLogon = cookies.email;

  return (
    <HtmlClassNameProvider className={clsx(ThemeClassNames.wrapper.docsPages)}>
      <Layout>
        {isLogon ? renderRoutes(props.route.routes) : accessDeny()}
      </Layout>
    </HtmlClassNameProvider>
  );
}
