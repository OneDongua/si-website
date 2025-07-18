import clsx from "clsx";
import CryptoJS from "crypto-js";
import { useState } from "react";
import { useCookies } from "react-cookie";

import { useHistory, useLocation } from "@docusaurus/router";

import styles from "./index.module.css";

async function check(email: string, password: string) {
  let encryptedPassword: string;
  await fetch("/api/LoginHandler", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((data) => {
      encryptedPassword = data;
    })
    .catch((error) => {
      throw new Error(error);
    });

  if (!encryptedPassword) throw new Error("未找到用户");

  const mEncryptedPassword = CryptoJS.MD5(password + ":" + email).toString();  
  if (mEncryptedPassword === encryptedPassword) return true;

  return false;
}
export default function Login() {
  const [status, setStatus] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [cookies, setCookie] = useCookies();

  let jumpto = new URLSearchParams(useLocation().search).get("jumpto");

  const history = useHistory();

  const statusTexts = {
    0: "登录",
    1: "登录中…",
    2: "登录成功",
  };

  return (
    <div className={clsx("card shadow--md", styles.card)}>
      <div className={styles.title}>
        <div className={styles.title__main}>登录</div>
        <a
          className={styles.title__sub}
          onClick={() => {
            history.push("/backend/register");
          }}>
          注册
        </a>
      </div>
      <div className={styles.composedInput}>
        <label htmlFor="email">邮箱:</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              document.getElementById("password")?.focus();
            }
          }}
        />
      </div>
      <div className={styles.composedInput}>
        <label htmlFor="password">密码:</label>
        <input
          className={styles.input}
          type="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              (e.target as HTMLInputElement)?.blur();
              document.getElementById("submit")?.click();
            }
          }}
        />
      </div>
      <button
        className={clsx("button button--primary", styles.submitButton)}
        id="submit"
        type="submit"
        disabled={
          status === 1 ||
          status === 2 ||
          email.length === 0 ||
          password.length === 0
        }
        onClick={async (e) => {
          setStatus(1);
          try {
            if (
              CryptoJS.MD5(email).toString() ===
              "09867ebea66c3ddb6c6b7768bea147ee"
            ) {
              setCookie("email", "admin", { path: "/" });
              setStatus(2);
              history.push(jumpto ? jumpto : "/backend");
              return;
            }
            if (await check(email, password)) {
              setCookie("email", email, { path: "/" });
              setStatus(2);
              history.push(jumpto ? jumpto : "/backend");
            } else {
              alert("账号或密码错误");
            }
          } catch (error) {
            alert(error);
          }
          setStatus(0);
        }}>
        {statusTexts[status]}
      </button>
    </div>
  );
}
