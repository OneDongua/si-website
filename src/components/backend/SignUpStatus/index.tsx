import clsx from "clsx";
import { useEffect, useState } from "react";

import styles from "./index.module.css";

async function getData() {
  let mData = {}; /* && {
    "1720944555451": {
      name: "李华",
      classes: "高一（1）班",
      email: "123456789@qq.com",
    },
  }; // 测试数据，记得注释！ */
  await fetch("/api/SignUpHandler?timestamp=" + Date.now().toString(), {
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
    .then((data) => {
      mData = data;
    })
    .catch((error) => {
      console.error(error);
    });
  return mData;
}
export default function SignUpStatus() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const timeout = setTimeout(async () => {
      const mData = await getData();
      setData(mData);
    }, 200);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={clsx("card shadow--md", styles.card)}>
      <table className={styles.table}>
        <caption className="hero__subtitle text--bold padding--sm">
          报名人员
        </caption>
        <thead>
          <tr>
            <th scope="col">姓名</th>
            <th scope="col">班级</th>
            <th scope="col">邮箱</th>
            <th scope="col">时间</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            Object.keys(data).map((key) => {
              return (
                <tr>
                  <th scope="row">{data[key].name}</th>
                  <td>{data[key].classes}</td>
                  <td>{data[key].email}</td>
                  <td>{new Date(Number.parseInt(key)).toLocaleString()}</td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colSpan={3}>
              总计
            </th>
            <td>{data && Object.keys(data).length}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
