import clsx from "clsx";
import { NavLink } from "react-router-dom";

import styles from "./index.module.css";

export default function Sidebar({ sidebar, setSidebar }) {
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
          <NavLink
            to="/backend"
            className={styles.item}
            activeClassName={styles.item__active}>
            <svg height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368">
              <rect fill="none" height="24" width="24" />
              <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M5,19V5h6v14H5z M19,19h-6v-7h6V19z M19,10h-6V5h6V10z" />
            </svg>
            总览
          </NavLink>
        </nav>
      </aside>
    </div>
  );
}
