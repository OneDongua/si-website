import { useState } from "react";
import { useCookies } from "react-cookie";
import { Route } from "react-router-dom";

import Dashbroad from "../components/backend/Dashbroad";
import Login from "../components/backend/Login";
import Navbar from "../components/backend/Navbar";
import Sidebar from "../components/backend/Sidebar";
import styles from "./styles/backend.module.css";

function Backend() {
  const [isSidebarShow, setIsSidebarShow] = useState(false);
  const [cookie] = useCookies();

  const isLogin = cookie.email;

  return (
    <div className={styles.background}>
      <div className={styles.navbar}>
        <Navbar sidebar={isSidebarShow} setSidebar={setIsSidebarShow} />
      </div>
      {isLogin ? (
        <div className={styles.content}>
          <Sidebar sidebar={isSidebarShow} setSidebar={setIsSidebarShow} />
          <main className={styles.main}>
            <Route exact path="" component={Dashbroad} />
          </main>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default Backend;
