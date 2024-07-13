import Layout from "@theme/Layout";
import { useState } from "react";

import styles from "./sign_up.module.css";
import clsx from "clsx";
function Form() {
  const [name, setName] = useState("");
  const [classes, setClasses] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(0);

  let statusTexts = {
    0: "提交",
    1: "提交中…",
    2: "提交成功",
    3: "重试",
  };

  return (
    <div className={clsx("card shadow--md", styles.card)}>
      <div className={styles.title}>加入我们</div>
      <div className={styles.composedInput}>
        <label htmlFor="name">姓名:</label>
        <input
          className={styles.input}
          type="text"
          id="name"
          placeholder="李华"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className={styles.composedInput}>
        <label htmlFor="classes">班级:</label>
        <input
          className={styles.input}
          type="text"
          id="classes"
          placeholder="高一(1)班"
          onChange={(e) => {
            setClasses(e.target.value);
          }}
        />
      </div>
      <div className={styles.composedInput}>
        <label htmlFor="email">邮箱:</label>
        <input
          className={styles.input}
          type="email"
          id="email"
          placeholder="12345678@nb.com"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <button
        className={clsx("button button--primary", styles.submitButton)}
        type="submit"
        disabled={
          name.length === 0 ||
          classes.length === 0 ||
          email.length === 0 ||
          status === 1 ||
          status === 2
        }
        onClick={(e) => {
          setStatus(1);
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
              if (response.ok) {
                setStatus(2);
                return response.text();
              } else {
                setStatus(3);
                throw new Error("Network response was not ok");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }}>
        {statusTexts[status]}
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
