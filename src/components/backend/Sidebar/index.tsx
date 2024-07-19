import clsx from "clsx";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

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
        </nav>
        <div
          className={styles.logout}
          title="退出登录"
          onClick={(e) => {
            removeCookie("email", { path: "/" });
            history.push("/backend/login");
          }}>
          <svg
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368">
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h240q17 0 28.5 11.5T480-800q0 17-11.5 28.5T440-760H200v560h240q17 0 28.5 11.5T480-160q0 17-11.5 28.5T440-120H200Zm487-320H400q-17 0-28.5-11.5T360-480q0-17 11.5-28.5T400-520h287l-75-75q-11-11-11-27t11-28q11-12 28-12.5t29 11.5l143 143q12 12 12 28t-12 28L669-309q-12 12-28.5 11.5T612-310q-11-12-10.5-28.5T613-366l74-74Z" />
          </svg>
        </div>
      </aside>
    </div>
  );
}
