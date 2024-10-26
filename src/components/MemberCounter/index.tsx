import clsx from "clsx";

import styles from "./index.module.css";

function MemberCounter() {
  return (
    <div className={clsx("card shadow--md", styles.card)}>
      <caption className={styles.caption}>社团人数</caption>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr className={styles.tableRow}>
            <th scope="col">社员</th>
            <th scope="col">管理层</th>
            <th scope="col">总计</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          <tr className={styles.tableRow}>
            <td>57</td>
            <td>9</td>
            <td>66</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MemberCounter;
