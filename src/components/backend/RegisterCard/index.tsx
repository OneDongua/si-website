import clsx from "clsx";
import CryptoJS from "crypto-js";
import { useState } from "react";

import { useHistory } from "@docusaurus/router";

import styles from "./index.module.css";

async function checkAndRegister(email: string, password: string, code: string) {
  const rightCode = CryptoJS.MD5(email + email).toString();
  if (code !== rightCode) throw new Error("注册码无效");

  const encryptedPassword = CryptoJS.MD5(password + ":" + email).toString();
  await fetch("/api/RegisterHandler", {
    method: "POST",
    body: JSON.stringify({ email: encryptedPassword }),
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .catch((error) => {
      throw new Error(error);
    });

  return true;
}
export default function Login() {
  const [status, setStatus] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const statusTexts = {
    0: "注册",
    1: "注册中…",
    2: "注册成功",
  };

  const history = useHistory();

  return (
    <div className={clsx("card shadow--md", styles.card)}>
      <div className={styles.title}>
        <a
          className={styles.title__sub}
          onClick={(e) => {
            history.push("/backend/login");
          }}>
          登录
        </a>
        <div className={styles.title__main}>注册</div>
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
        />
      </div>
      <div className={styles.composedInput}>
        <label htmlFor="code">注册码:</label>
        <input
          className={styles.input}
          type="password"
          id="code"
          onChange={(e) => {
            setCode(e.target.value);
          }}
        />
      </div>
      <button
        className={clsx("button button--primary", styles.submitButton)}
        type="submit"
        disabled={
          status === 1 ||
          status === 2 ||
          email.length === 0 ||
          password.length === 0 ||
          code.length === 0
        }
        onClick={async (e) => {
          setStatus(1);
          try {
            if (await checkAndRegister(email, password, code)) {
              setStatus(2);
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
