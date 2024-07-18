import clsx from "clsx";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";

import { useHistory } from "@docusaurus/router";

import styles from "./index.module.css";

export default function Sidebar(props: {
  sidebar: boolean;
  setSidebar: (sidebar: boolean) => void;
  setContentIndex: (index: number) => void;
}) {
  const { sidebar, setSidebar, setContentIndex } = props;

  const [index, setIndex] = useState(0);
  const [cookie, setCookie, removeCookie] = useCookies();

  const history = useHistory();

  useEffect(() => {
    setContentIndex(index);
  }, [index]);

  return (
    <div className={styles.parent}>
      <div
        role="presentation"
        className={styles.presentation}
        data-show={sidebar}
        onClick={(e) => {
          setSidebar(false);
        }}
      />
      <aside className={styles.sidebar} data-show={sidebar}>
        <nav
          aria-label="侧边栏"
          className={clsx("thin-scrollbar", styles.background)}>
          <div
            className={clsx(styles.item, index === 0 && styles.item__active)}
            onClick={(e) => {
              setIndex(0);
            }}>
            <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368">
              <rect fill="none" height="24" width="24" />
              <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M5,19V5h6v14H5z M19,19h-6v-7h6V19z M19,10h-6V5h6V10z" />
            </svg>
            总览
          </div>
          <div
            className={clsx(styles.item, index === 1 && styles.item__active)}
            onClick={(e) => {
              setIndex(1);
            }}>
            <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368">
              <rect fill="none" height="24" width="24" />
              <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M5,19V5h6v14H5z M19,19h-6v-7h6V19z M19,10h-6V5h6V10z" />
            </svg>
            注册码
          </div>
        </nav>
        <div
          className={styles.logout}
          title="退出登录"
          onClick={(e) => {
            removeCookie("email", { path: "/" });
            history.push("/backend/login");
          }}>
          <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368">
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z" />
            </g>
          </svg>
        </div>
      </aside>
    </div>
  );
}
