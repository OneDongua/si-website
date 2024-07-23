import { useEffect, useState } from "react";

import styles from "./index.module.css";

interface QAData {
  question: string;
  answer: string;
}

interface QADatas {
  [timestamp: number]: QAData;
}

async function getData() {
  let mData: QADatas = { 1721737752679: { question: "123", answer: "456" } };
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

async function uploadQuestion(timestamp: number, data: QAData) {
  await fetch("/api/QAHandler", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ timestamp: timestamp, data: data }),
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

async function deleteQuestion(timestamp: number) {
  await fetch("/api/QAHandler", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ delete: timestamp }),
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

export default function QAManager() {
  const [data, setData] = useState(null as QADatas);

  useEffect(() => {
    async function getAndSetData() {
      setData(await getData());
    }
    getAndSetData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>
        <div className={styles.title}>Q&A管理</div>
      </div>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr className={styles.tableRow}>
            <th scope="col">时间</th>
            <th scope="col">问题</th>
            <th scope="col">答案</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {data &&
            Object.keys(data).map((key) => {
              return (
                <tr className={styles.tableRow}>
                  <td>{new Date(Number.parseInt(key)).toLocaleString()}</td>
                  <td>{data[key].question}</td>
                  <td>
                    <textarea
                      className={styles.textarea}
                      rows={2}
                      value={data[key].answer}
                      onChange={(e) => {
                        setData(
                          Object.fromEntries(
                            Object.entries(data).map(([k, v]) => {
                              if (k === key) {
                                v.answer = e.target.value;
                              }
                              return [k, v];
                            })
                          )
                        );
                      }}
                    />
                  </td>
                  <td>
                    <div
                      className={styles.operate}
                      onClick={async () => {
                        try {
                          await deleteQuestion(Number.parseInt(key));
                          setData(
                            Object.fromEntries(
                              Object.entries(data).filter(
                                ([key]) => key !== key
                              )
                            )
                          );
                        } catch (error) {
                          alert("删除失败");
                          console.error(error);
                        }
                      }}>
                      删除
                    </div>
                    <div
                      className={styles.operate}
                      onClick={async () => {
                        try {
                          await uploadQuestion(Number.parseInt(key), data[key]);
                          alert("上传成功");
                        } catch (error) {
                          alert("上传失败");
                          console.error(error);
                        }
                      }}>
                      上传
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
