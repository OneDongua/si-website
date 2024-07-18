import clsx from "clsx";

import styles from "./index.module.css";

export default function Login() {
  return (
    <div className={clsx("card shadow--md", styles.card)}>
      <div className={styles.title}>登录</div>
      <div className={styles.composedInput}>
        <label htmlFor="email">邮箱:</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          onChange={(e) => {}}
        />
      </div>
      <div className={styles.composedInput}>
        <label htmlFor="password">密码:</label>
        <input
          className={styles.input}
          type="password"
          id="password"
          onChange={(e) => {}}
        />
      </div>
      <button
        className={clsx("button button--primary", styles.submitButton)}
        type="submit"
        onClick={(e) => {}}>
        登录
      </button>
    </div>
  );
}
