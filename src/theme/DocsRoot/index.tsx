import clsx from "clsx";
import React from "react";

import renderRoutes from "@docusaurus/renderRoutes";
import {
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import Layout from "@theme/Layout";

import styles from "./styles.module.css";

import type { Props } from "@theme/DocVersionRoot";

const masterSwitch = true; // 文档查看总开关，true为开启，false为关闭

function accessDeny() {
  return (
    <div className={clsx(styles.accessDeny, "alert alert--danger")}>
      ❌ 您没有权限查看该目录
    </div>
  );
}

export default function DocsRoot(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider className={clsx(ThemeClassNames.wrapper.docsPages)}>
      <Layout>
        {masterSwitch ? renderRoutes(props.route.routes) : accessDeny()}
      </Layout>
    </HtmlClassNameProvider>
  );
}
