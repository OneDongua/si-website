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
        '{"0": {"0": 0, "1": 0}, "1": {"0": 3, "1": 5, "2": 2}}'
      ); */
    });
  return { mData, mResult };
}

export default function VoteResult() {
  const [datas, setDatas] = useState(null as VoteDatas);
  const [results, setResults] = useState(null as VoteResults);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function getAndSetData() {
    if (isRefreshing) return;
    setIsRefreshing(true);

    const { mData, mResult } = await getData();
    setDatas(mData);
    setResults(mResult);

    setTimeout(() => setIsRefreshing(false), 2000);
  }

  useEffect(() => {
    getAndSetData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <button
          className={clsx(
            styles.toolButton,
            isRefreshing ? styles.unrefreshable : null
          )}
          onClick={getAndSetData}
          disabled={isRefreshing}
        >
          <svg
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368"
          >
            <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
          </svg>
        </button>
        <button
          className={clsx(styles.toolButton, styles.addButton)}
          onClick={() => alert("还没做")}
        >
          <svg
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </button>
      </div>
      {datas ? (
        Object.keys(datas).map((id) => {
          return (
            <div className={clsx(styles.group, "card shadow--md")} key={id}>
              <div className={styles.title}>{datas[id].title}</div>
              <div className={styles.desc}>{datas[id].desc}</div>
              {Object.keys(datas[id].items).map((index) => {
                const resultItem: VoteResult = results[id] || {};
                let total = 0;
                Object.keys(resultItem).forEach((i) => {
                  total += resultItem[i];
                });
                const count =
                  resultItem[index] !== undefined ? results[id][index] : 0;
                const percent = count / total || 0;
                return (
                  <div className={styles.item} key={index}>
                    <div
                      className={styles.fill}
                      style={{
                        width: `${total ? percent * 100 : 0}%`,
                      }}
                    />
                    <div
                      className={clsx(
                        styles.text,
                        percent <= 0.1 ? styles.textOverflow : null
                      )}
                    >
                      {datas[id].items[index] + ": " + count}
                    </div>
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
