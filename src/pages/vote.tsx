import clsx from "clsx";
import { useEffect, useState } from "react";

import Layout from "@theme/Layout";

import { VoteDatas, VoteResultData } from "../types/VoteTypes";
import styles from "./styles/vote.module.css";

declare global {
  interface Window {
    clearVote?: () => void;
  }
}
async function getData() {
  let mData: VoteDatas;
  await fetch("/api/VoteHandler?type=get&timestamp=" + Date.now().toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Network response was not ok");
      }
    })
    .then((data: VoteDatas) => {
      mData = data;
    })
    .catch((error) => {
      console.error(error);
      /* mData = JSON.parse(
        '{"0": {"title": "test", "desc": "abc", "items": {"0": "abc", "1": "def"}, "max": 1}, "1": {"title": "test2", "desc": "666", "items": {"0": "aaa", "1": "bbb", "2": "ccc"}, "max": 1}}'
      ); */
    });
  return mData;
}
export default function Vote() {
  const [datas, setDatas] = useState(null as VoteDatas);
  const [result, setResult] = useState({} as VoteResultData);
  const [status, setStatus] = useState(0);

  const statusTexts = {
    0: "提交",
    1: "提交中…",
    2: "提交成功",
    3: "重试",
  };
  async function getAndSetData() {
    const data = await getData();
    setDatas(data);
  }

  async function uploadVote() {
    setStatus(1);
    await fetch("/api/VoteHandler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    })
      .then((response) => {
        if (response.ok) {
          setStatus(2);
          localStorage.setItem("vote", "done");
          return response.text();
        } else {
          setStatus(3);
          console.error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    window.clearVote = () => {
      localStorage.clear();
    };
    getAndSetData();
    if (localStorage.getItem("vote") === "done") setStatus(2);
  }, []);

  return (
    <Layout title="投票">
      <div className={styles.background}>
        {datas ? (
          Object.keys(datas).map((id) => {
            return (
              <div className={clsx(styles.group, "card shadow--md")} key={id}>
                <div className={styles.title}>{datas[id].title}</div>
                <div className={styles.desc}>{datas[id].desc}</div>
                {Object.keys(datas[id].items).map((index) => {
                  const indexs: number[] = result[id] || [];
                  const isSelected = indexs.includes(parseInt(index));
                  return (
                    <div
                      className={clsx(
                        styles.item,
                        isSelected ? styles.selected : null
                      )}
                      onClick={() => {
                        const max = parseInt(datas[id].max);
                        const res = { ...result }; //使用展开运算符创建 result 的副本
                        const mIndexs: number[] = res[id] || [];
                        if (mIndexs.length >= max) {
                          mIndexs.shift();
                        }
                        mIndexs.push(parseInt(index));
                        res[id] = mIndexs;
                        setResult(res);
                        console.log(res);
                      }}
                      key={index}
                    >
                      {datas[id].items[index]}
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <div className={styles.loading}>加载中…</div>
        )}
        <button
          className={clsx(styles.submit, "button button--primary")}
          onClick={() => {
            uploadVote();
          }}
          disabled={status === 1 || status === 2}
        >
          {statusTexts[status]}
        </button>
      </div>
    </Layout>
  );
}
