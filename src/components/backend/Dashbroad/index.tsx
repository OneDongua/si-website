import SignUpStatus from "../SignUpStatus";
import styles from "./index.module.css";

async function test() {
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
      console.log(data);
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export default function Dashbroad() {
  return (
    <div className={styles.container}>
      <SignUpStatus />
      <button
        onClick={async (e) => {
          try {
            await test();
          } catch (error) {
            console.log(error);
          }
        }}>
        test
      </button>
    </div>
  );
}
