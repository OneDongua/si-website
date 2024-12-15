import clsx from "clsx";
import { useEffect, useState } from "react";

import Layout from "@theme/Layout";

import styles from "./styles/vote.module.css";

interface VoteData {
  title: string;
  desc: string;
  items: VoteItems;
  max: number;
}

interface VoteDatas {
  [id: number]: VoteData;
}

interface VoteItems {
  [index: number]: string;
}

interface VoteResult {
  [id: number]: number[];
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
        throw new Error("Network response was not ok");
      }
    })
    .then((data: VoteDatas) => {
      mData = data;
    })
    .catch((error) => {
      console.error(error);
      mData = JSON.parse(
        '{"0": {"title": "test", "desc": "abc", "items": {"0": "abc", "1": "def"}, "max": 1}, "1": {"title": "test2", "desc": "666", "items": {"0": "aaa", "1": "bbb", "2": "ccc"}, "max": 1}}'
      );
    });
  return mData;
}

async function uploadVote(data: VoteResult) {
  await fetch("/api/VoteHandler", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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
export default function Vote() {
  const [datas, setDatas] = useState(null as VoteDatas);
  const [result, setResult] = useState({});
  async function getAndSetData() {
    const data = await getData();
    setDatas(data);
  }

  useEffect(() => {
    getAndSetData();
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
                  return (
                    <div
                      className={styles.item}
                      onClick={() => {
                        const max = parseInt(datas[id].max);
                        const res = { ...result }; //使用展开运算符创建 result 的副本
                        const indexs: number[] = res[id] || [];
                        if (indexs.length >= max) {
                          indexs.shift();
                        }
                        indexs.push(parseInt(index));
                        res[id] = indexs;
                        setResult(res);
                        console.log(res);
                      }}
                      key={index}>
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
        <div
          className={clsx(styles.ask, "button button--primary")}
          onClick={() => {
            uploadVote(result);
          }}>
          提交
        </div>
      </div>
    </Layout>
  );
}
