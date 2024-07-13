import Layout from "@theme/Layout";
import { useState } from "react";

import styles from "./signup.module.css";
import clsx from "clsx";

async function upload(data: string) {
  const url =
    "https://cors-anywhere.herokuapp.com/https://dav.jianguoyun.com/dav/test/test.json";

  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "text/plain",
      Authorization: "Basic ODc1NjU4Njk3QHFxLmNvbTphMnA3Y2ZnY3QyeWZ1aHI4", // 个人密钥
    },
    body: data,
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error(error);
    });
}
// TODO 状态显示

function Form() {
  const [name, setName] = useState("");
  const [classes, setClasses] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className={clsx("card shadow--md", styles.card)}>
      <div className={styles.title}>加入我们</div>
      <div className={styles.composedInput}>
        <label htmlFor="name">姓名:</label>
        <input
          className={styles.input}
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.composedInput}>
        <label htmlFor="classes">班级:</label>
        <input
          className={styles.input}
          type="text"
          id="classes"
          onChange={(e) => setClasses(e.target.value)}
        />
      </div>
      <div className={styles.composedInput}>
        <label htmlFor="email">邮箱:</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        className={clsx("button button--primary", styles.button)}
        type="submit"
        onClick={(e) => {
          const data = {
            name: name,
            classes: classes,
            email: email,
          };
          fetch("/api/signupHandler", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ timestamp: Date.now(), data: data }),
          })
            .then((response) => {
              return response.text();
            })
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.error(error);
            });
          //upload(JSON.stringify(data));
        }}>
        提交
      </button>
    </div>
  );
}
export default function Signup() {
  return (
    <Layout title="报名">
      <div className={styles.background}>
        <Form />
      </div>
    </Layout>
  );
}
