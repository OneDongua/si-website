import { Route } from "react-router-dom";

import Dashbroad from "../components/backend/Dashbroad";
import Navbar from "../components/backend/Navbar";
import Sidebar from "../components/backend/Sidebar";
import styles from "./styles/backend.module.css";

function Backend() {
  return (
    <div className={styles.background}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <Sidebar />
        </aside>
        <main className={styles.main}>
          <Route exact path="" component={Dashbroad} />
        </main>
      </div>
    </div>
  );
}

export default Backend;
