import clsx from "clsx";
import CryptoJS from "crypto-js";
import { useState } from "react";
import { useCookies } from "react-cookie";

import styles from "./index.module.css";

async function check(email: string, password: string) {
  let encryptedPassword: string;
  await fetch("/api/LoginHandler", {
    method: "POST",
    body: JSON.stringify({ email: email }),
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
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

  const bytes = CryptoJS.AES.decrypt(encryptedPassword, "SIWEBSITE1234567"); //明文密钥，不安全
  if (password === bytes.toString(CryptoJS.enc.Utf8)) return true;

  return false;
}
export default function Login() {
  const [status, setStatus] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [cookies, setCookie] = useCookies();

  const statusTexts = {
    0: "登录",
    1: "登录中…",
  };

  return (
    <div className={clsx("card shadow--md", styles.card)}>
      <div className={styles.title}>登录</div>
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
      <button
        className={clsx("button button--primary", styles.submitButton)}
        type="submit"
        onClick={async (e) => {
          setStatus(1);
          try {
            if (await check(email, password)) {
              setCookie("email", email, { path: "/" });
              console.log("登录成功");
              window.location.reload();
            } else {
              console.log("账号或密码错误");
            }
          } catch (error) {
            console.log(error);
          }
          setStatus(0);
        }}>
        {statusTexts[status]}
      </button>
    </div>
  );
}
