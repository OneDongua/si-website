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
            <svg
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368">
              <path d="M160-240q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h640q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240H160Zm0-200q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h640q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H160Zm0-200q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h640q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H160Z" />
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
            <svg
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368">
              <path d="M240-200h120v-200q0-17 11.5-28.5T400-440h160q17 0 28.5 11.5T600-400v200h120v-360L480-740 240-560v360Zm-80 0v-360q0-19 8.5-36t23.5-28l240-180q21-16 48-16t48 16l240 180q15 11 23.5 28t8.5 36v360q0 33-23.5 56.5T720-120H560q-17 0-28.5-11.5T520-160v-200h-80v200q0 17-11.5 28.5T400-120H240q-33 0-56.5-23.5T160-200Zm320-270Z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
