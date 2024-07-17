import clsx from "clsx";

import styles from "./index.module.css";

function getList() {
  const list = [];
  fetch("/api/SignUpHandler?timestamp=" + Date.now().toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        list.push(JSON.stringify(response.json()));
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return list;
}
export default function SignUpStatus() {
  return (
    <div className={clsx("card shadow--md", styles.card)}>
      <button
        onClick={(e) => {
          const list = getList();
          console.log("test: ", list);
        }}>
        get
      </button>
    </div>
  );
}
