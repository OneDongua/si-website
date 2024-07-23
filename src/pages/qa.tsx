import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import Layout from "@theme/Layout";

import styles from "./styles/qa.module.css";

interface QAData {
  question: string;
  answer: string;
}

interface QADatas {
  [timestamp: number]: QAData;
}

async function getData() {
  let mData: QADatas;
  await fetch("/api/QAHandler?timestamp=" + Date.now().toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((data: QADatas) => {
      mData = data;
    })
    .catch((error) => {
      console.error(error);
    });
  return mData;
}

async function uploadQuestion(data: QAData) {
  await fetch("/api/QAHandler", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ timestamp: Date.now(), data: data }),
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
}

function Dialog(props: { onClose?: () => void; onFinish?: () => void }) {
  const { onClose, onFinish } = props;

  const escFunction = useCallback((e: any) => {
    if (e.key === "Escape") {
      onClose();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  const [text, setText] = useState("");
  const [status, setStatus] = useState(0);

  const statusText = {
    0: "提交",
    1: "提交中…",
  };

  return createPortal(
    <div className={styles.dialogBackground}>
      <div className={styles.dialog}>
        <div className={styles.dialogTitle}>说出你的问题：</div>
        <input
          className={styles.dialogInput}
          value={text}
          type="text"
          onChange={(e) => setText(e.target.value)}
        />
        <div className={styles.dialogButtons}>
          <button
            className={clsx(styles.dialogNegative, "button button--primary")}
            onClick={onClose}>
            取消
          </button>
          <button
            className={clsx(styles.dialogPositive, "button button--primary")}
            onClick={async () => {
              setStatus(1);
              try {
                await uploadQuestion({
                  question: text,
                  answer: "",
                });
                onFinish();
              } catch (error) {
                alert("提交失败");
                console.error(error);
                onClose();
              }
              setStatus(0);
            }}
            disabled={status === 1 || text.length === 0}>
            {statusText[status]}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
export default function QA() {
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState(null as QADatas);

  async function getAndSetData() {
    setData(await getData());
  }

  useEffect(() => {
    getAndSetData();
  }, []);

  return (
    <Layout title="Q&A">
      <div className={styles.background}>
        <div className={styles.title}>Q&A</div>
        {data &&
          Object.keys(data).map((key) => {
            return (
              <div className={clsx(styles.group, "card shadow--md")}>
                <div className={styles.question}>问：{data[key].question}</div>
                {data[key].answer ? (
                  <div className={styles.answer}>答：{data[key].answer}</div>
                ) : (
                  <div className={styles.noanswer}>暂无回答</div>
                )}
              </div>
            );
          })}
        <div
          className={clsx(styles.ask, "button button--primary")}
          onClick={() => {
            setShowDialog(true);
          }}>
          我要提问
        </div>
        {showDialog && (
          <Dialog
            onClose={() => setShowDialog(false)}
            onFinish={() => {
              setShowDialog(false);
              alert("提交成功，请手动刷新，可能存在延迟");
            }}
          />
        )}
      </div>
    </Layout>
  );
}
