import clsx from "clsx";
import { useEffect, useState } from "react";

import styles from "./index.module.css";

async function getData() {
  let array = [];
  await fetch("/api/DataHandler", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ get: "economy" }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((data) => {
      array = data.economy || [];
    })
    .catch((error) => {
      console.error(error);
    });
  return array;
}

async function uploadData(data: Array<any>) {
  await fetch("/api/DataHandler", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ __economy: { economy: data } }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((data) => {
      if (data.msg === "Success") {
        alert("上传成功");
      }
    })
    .catch((error) => {
      alert("上传失败");
      console.error(error);
    });
}

export default function EconomyManager() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(0);

  const statusText = {
    0: "保存并上传",
    1: "上传中…",
  };

  useEffect(() => {
    async function getAndSetData() {
      setData(await getData());
    }
    getAndSetData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>
        <div className={styles.title}>经费管理</div>
        <button
          className={clsx("button button--primary", styles.uploadButton)}
          onClick={async (e) => {
            setStatus(1);
            await uploadData(data);
            setStatus(0);
          }}
          disabled={status === 1}>
          {statusText[status]}
        </button>
      </div>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr className={styles.tableRow}>
            <th scope="col">ID</th>
            <th scope="col">项目</th>
            <th scope="col">金额</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {data &&
            data.map((item: any) => {
              return (
                <tr className={styles.tableRow}>
                  <th scope="row">{item.id}</th>
                  <th>
                    <input
                      className={styles.input}
                      type="text"
                      value={item.name}
                      onChange={(e) => {
                        setData(
                          data.map((i: any) => {
                            if (i.id === item.id) {
                              i.name = e.target.value;
                            }
                            return i;
                          })
                        );
                      }}
                    />
                  </th>
                  <td>
                    <input
                      className={styles.input}
                      value={item.value}
                      type="tel"
                      onFocus={(e) => {
                        e.target.select();
                      }}
                      onChange={(e) => {
                        setData(
                          data.map((i: any) => {
                            if (i.id === item.id) {
                              const value = e.target.value;
                              i.value =
                                value !== "" ? Number.parseInt(value) : 0;
                            }
                            return i;
                          })
                        );
                      }}
                    />
                  </td>
                  <td>
                    <div
                      className={styles.operate}
                      onClick={() => {
                        setData(
                          data.filter((i: any) => {
                            return i.id !== item.id;
                          })
                        );
                      }}>
                      删除
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <button
        className={styles.addButton}
        onClick={() => {
          setData(
            data.concat({ id: data.length + 1, name: "新项目", value: 0 })
          );
        }}>
        <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
          <path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
        </svg>
      </button>
    </div>
  );
}
