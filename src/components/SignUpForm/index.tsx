import clsx from "clsx";
import { useState } from "react";

import styles from "./index.module.css";

export default function Form(props: {
  masterSwitch?: boolean;
  autoClear?: boolean;
}) {
  const { masterSwitch, autoClear } = props;

  const [name, setName] = useState("");
  const [classes, setClasses] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(0);

  const statusTexts = {
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
          disabled={!masterSwitch}
          value={name}
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
          disabled={!masterSwitch}
          value={classes}
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
          placeholder="1234567890@qq.com"
          disabled={!masterSwitch}
          value={email}
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
          status === 2 ||
          !masterSwitch
        }
        onClick={() => {
          setStatus(1);
          const data = {
            name: name,
            classes: classes,
            email: email,
          };
          console.log(data);
          fetch("/api/SignUpHandler", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ timestamp: Date.now(), data: data }),
          })
            .then((response) => {
              if (response.ok) {
                setStatus(2);
                if (autoClear) {
                  setTimeout(() => {
                    setStatus(0);
                    setName("");
                    setClasses("高一()班");
                    setEmail("");
                  }, 2000);
                }
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
