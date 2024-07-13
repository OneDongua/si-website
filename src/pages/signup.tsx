import Layout from "@theme/Layout";
import { useState } from "react";

import styles from "./signup.module.css";
import clsx from "clsx";

async function upload(data: string) {
  const url =
    "https://cors-anywhere.herokuapp.com/https://dav.jianguoyun.com/dav/test/test.json";

  const username = "875658697@qq.com";
  const password = "a2p7cfgct2yfuhr8";
  const basicAuth = btoa(`${username}:${password}`);

  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "text/plain",
      Authorization: "Basic " + basicAuth,
    },
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

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
