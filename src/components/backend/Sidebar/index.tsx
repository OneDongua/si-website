import clsx from "clsx";

import styles from "./index.module.css";

export default function Sidebar() {
  return (
    <nav
      aria-label="侧边栏"
      className={clsx("thin-scrollbar", styles.background)}>
      <a href="/backend/">
        <button className={styles.item}>总览</button>
      </a>
    </nav>
  );
}
