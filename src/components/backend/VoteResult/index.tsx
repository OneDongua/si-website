import clsx from "clsx";
import { useEffect, useState } from "react";

import styles from "./index.module.css";

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

interface VoteResults {
  [id: number]: VoteResult;
}

interface VoteResult {
  [item: number]: number;
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
  let mResult: VoteResults;
  await fetch("/api/VoteHandler?type=calc&timestamp=" + Date.now().toString(), {
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
    .then((data: VoteResults) => {
      mResult = data;
    })
    .catch((error) => {
      console.error(error);
      /* mResult = JSON.parse(
        '{"0": {"0": 10, "1": 5}, "1": {"0": 3, "1": 5, "2": 2}}'
      ); */
    });
  return { mData, mResult };
}

export default function VoteResult() {
  const [datas, setDatas] = useState(null as VoteDatas);
  const [results, setResults] = useState(null as VoteResults);
  async function getAndSetData() {
    const { mData, mResult } = await getData();
    setDatas(mData);
    setResults(mResult);
  }

  useEffect(() => {
    getAndSetData();
  }, []);

  return (
    <div className={styles.container}>
      {datas ? (
        Object.keys(datas).map((id) => {
          return (
            <div className={clsx(styles.group, "card shadow--md")} key={id}>
              <div className={styles.title}>{datas[id].title}</div>
              <div className={styles.desc}>{datas[id].desc}</div>
              {Object.keys(datas[id].items).map((index) => {
                return (
                  <div className={styles.item} key={index}>
                    {datas[id].items[index] +
                      ": " +
                      (results[id]?.[index] !== undefined
                        ? results[id][index]
                        : 0)}
                  </div>
                );
              })}
            </div>
          );
        })
      ) : (
        <div className={styles.loading}>加载中…</div>
      )}
    </div>
  );
}
