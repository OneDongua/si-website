import clsx from "clsx";
import { useEffect, useState } from "react";

import { VoteDatas, VoteItems, VoteResultData, VoteResultsData } from "@site/src/types/VoteTypes";

import styles from "./index.module.css";

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
  let mResult: VoteResultsData;
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
    .then((data: VoteResultsData) => {
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

async function uploadData(data: VoteDatas) {
  await fetch("/api/VoteHandler?type=data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert("上传成功");
        return response.text();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .catch((error) => {
      alert("上传失败");
      console.error(error);
    });
}

export default function VoteResult() {
  const [datas, setDatas] = useState(null as VoteDatas);
  const [results, setResults] = useState(null as VoteResultsData);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalDesc, setModalDesc] = useState("");
  const [items, setItems] = useState<{ id: number; content: string }[]>([]);
  const [maxCount, setMaxCount] = useState(1);

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
          disabled={isRefreshing}>
          <svg
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368">
            <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
          </svg>
        </button>
        <button
          className={clsx(styles.toolButton, styles.addButton)}
          onClick={() => setIsModalOpen(true)}>
          <svg
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#5f6368">
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
        </button>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>添加新投票</h3>
            <input
              type="text"
              placeholder="标题"
              value={modalTitle}
              onChange={(e) => setModalTitle(e.target.value)}
              className={styles.input}
            />
            <textarea
              placeholder="描述"
              value={modalDesc}
              onChange={(e) => setModalDesc(e.target.value)}
              className={styles.textarea}
            />
            投票项目:
            <div>
              {items.map((item) => (
                <div key={item.id} className={styles.itemRow}>
                  <span>{item.content}</span>
                  <button
                    className={styles.itemDeleteButton}
                    onClick={() =>
                      setItems(items.filter((i) => i.id !== item.id))
                    }>
                    <svg
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#1f1f1f">
                      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                  </button>
                </div>
              ))}
              <input
                type="text"
                placeholder="输入新项目，按回车添加"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    const newContent = e.currentTarget.value.trim();
                    if (!newContent) return;
                    const maxId = items.reduce(
                      (max, item) => Math.max(max, item.id),
                      -1
                    );
                    setItems([
                      ...items,
                      { id: maxId + 1, content: newContent },
                    ]);
                    e.currentTarget.value = "";
                  }
                }}
                className={styles.input}
              />
            </div>
            最多可选项数量:
            <input
              type="text"
              placeholder="最多可选项数量"
              value={maxCount}
              onChange={(e) => {
                const count = parseInt(e.target.value);
                setMaxCount(count || 1);
              }}
              onFocus={(e) => e.target.select()}
              className={styles.input}
            />
            <div className={styles.modalActions}>
              <button
                className="button button--primary"
                onClick={() => {
                  const maxId = Object.keys(datas).reduce((max, item) =>
                    Math.max(parseInt(max), parseInt(item)).toString()
                  );
                  const mItems: VoteItems = {};
                  items.forEach((value) => {
                    mItems[Object.keys(mItems).length] = value.content;
                  });
                  datas[parseInt(maxId) + 1] = {
                    title: modalTitle,
                    desc: modalDesc,
                    items: mItems,
                    max: maxCount,
                  };
                  uploadData(datas);
                  setIsModalOpen(false);
                }}>
                上传
              </button>
              <button
                className="button button--danger"
                onClick={() => setIsModalOpen(false)}>
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {datas ? (
        Object.keys(datas).map((id) => {
          return (
            <div className={clsx(styles.group, "card shadow--md")} key={id}>
              <div className={styles.title}>{datas[id].title}</div>
              <div className={styles.desc}>{datas[id].desc}</div>
              {Object.keys(datas[id].items).map((index) => {
                const resultItem: VoteResultData = results[id] || {};
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
                      )}>
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
