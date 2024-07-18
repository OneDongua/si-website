import clsx from "clsx";
import { useCookies } from "react-cookie";

import { useHistory } from "@docusaurus/router";

import styles from "./index.module.css";

export default function Navbar({ sidebar, setSidebar }) {
  const [cookies, setCookie, removeCookie] = useCookies();

  const history = useHistory();

  return (
    <nav
      aria-label="主导航"
      className={clsx(styles.navbar, styles.navbar__fixed_top)}>
      <div className={styles.navbar__inner}>
        <div className={styles.navbar__items}>
          <div
            className={styles.navbar__toggle}
            aria-label="侧边栏"
            onClick={(e) => {
              setSidebar(!sidebar);
            }}>
            <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </div>
          <a
            className={styles.navbar__brand}
            onClick={(e) => {
              history.push("/backend");
            }}>
            <div className={styles.navbar__logo}>
              <img src="/img/logo.png" alt="Logo" />
            </div>
            <b className={clsx(styles.navbar__title, "text--truncate")}>
              后台管理
            </b>
          </a>
        </div>
        <div
          className={clsx(styles.navbar__items, styles.navbar__items__right)}>
          <div className={styles.navbar__item}>{cookies.email}</div>
          <a
            className={clsx(styles.navbar__home)}
            title="返回主页"
            onClick={(e) => {
              history.push("/");
            }}>
            <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
