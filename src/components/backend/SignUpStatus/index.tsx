import clsx from "clsx";

import styles from "./index.module.css";

async function getData() {
  let data = {};
  fetch("/api/SignUpHandler?timestamp=" + Date.now().toString(), {
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
      this.data = data;
    })
    .catch((error) => {
      console.error(error);
    });
  return data;
}
export default function SignUpStatus() {
  const data = getData();
  const keys = Object.keys(data);
  return (
    <div className={"card shadow--md padding--md"}>
      <table>
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
          {keys.map((key) => {
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
            <td>{keys.length}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
