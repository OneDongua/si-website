import clsx from "clsx";
import { useEffect, useState } from "react";
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
          <div
            className={clsx(styles.item, index === 1 && styles.item__active)}
            onClick={(e) => {
              setIndex(1);
            }}>
            <svg
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368">
              <path d="M240-80q-50 0-85-35t-35-85v-80q0-17 11.5-28.5T160-320h80v-536q0-7 6-9.5t11 2.5l29 29q6 6 14 6t14-6l32-32q6-6 14-6t14 6l32 32q6 6 14 6t14-6l32-32q6-6 14-6t14 6l32 32q6 6 14 6t14-6l32-32q6-6 14-6t14 6l32 32q6 6 14 6t14-6l32-32q6-6 14-6t14 6l32 32q6 6 14 6t14-6l29-29q5-5 11-2.5t6 9.5v656q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-560H320v440h320q17 0 28.5 11.5T680-280v80q0 17 11.5 28.5T720-160ZM400-680h160q17 0 28.5 11.5T600-640q0 17-11.5 28.5T560-600H400q-17 0-28.5-11.5T360-640q0-17 11.5-28.5T400-680Zm0 120h160q17 0 28.5 11.5T600-520q0 17-11.5 28.5T560-480H400q-17 0-28.5-11.5T360-520q0-17 11.5-28.5T400-560Zm280-40q-17 0-28.5-11.5T640-640q0-17 11.5-28.5T680-680q17 0 28.5 11.5T720-640q0 17-11.5 28.5T680-600Zm0 120q-17 0-28.5-11.5T640-520q0-17 11.5-28.5T680-560q17 0 28.5 11.5T720-520q0 17-11.5 28.5T680-480ZM240-160h360v-80H200v40q0 17 11.5 28.5T240-160Zm-40 0v-80 80Z" />
            </svg>
            经费
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
