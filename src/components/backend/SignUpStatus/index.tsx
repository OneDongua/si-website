import clsx from "clsx";

import styles from "./index.module.css";

function getList() {
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
      console.log("data: ", data);
    })
    .catch((error) => {
      console.error(error);
    });
}
export default function SignUpStatus() {
  return (
    <div className={clsx("card shadow--md", styles.card)}>
      <button
        onClick={(e) => {
          getList();
        }}>
        get
      </button>
    </div>
  );
}
