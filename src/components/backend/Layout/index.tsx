import React, { useState } from "react";
import { useCookies } from "react-cookie";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import styles from "./index.module.css";

function Layout(props: {
  children?: React.ReactNode[];
  showIfLogon?: boolean;
}) {
  const { children: childrens, showIfLogon } = props;

  const [cookie] = useCookies();
  const isLogon = cookie.email;

  const [isSidebarShow, setIsSidebarShow] = useState(false);
  const [contentIndex, setContentIndex] = useState(0);

  return (
    <div className={styles.background}>
      <Navbar sidebar={isSidebarShow} setSidebar={setIsSidebarShow} />

      {isLogon && (
        <Sidebar
          sidebar={isSidebarShow}
          setSidebar={setIsSidebarShow}
          setContentIndex={setContentIndex}
        />
      )}
      <main className={styles.main}>
        {showIfLogon
          ? isLogon && childrens[contentIndex]
          : childrens[contentIndex]}
      </main>
    </div>
  );
}

export default Layout;
