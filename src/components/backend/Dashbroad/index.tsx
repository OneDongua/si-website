import EconomyStatus from "../../EconomyStatus";
import SignUpStatus from "../SignUpStatus";
import styles from "./index.module.css";

export default function Dashbroad() {
  return (
    <div className={styles.container}>
      <SignUpStatus />
      <EconomyStatus noColorMode={true} />
    </div>
  );
}
