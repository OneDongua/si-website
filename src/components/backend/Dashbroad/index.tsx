import SignUpStatus from "@site/src/components/backend/SignUpStatus";
import EconomyStatus from "@site/src/components/EconomyStatus";

import styles from "./index.module.css";

export default function Dashbroad() {
  return (
    <div className={styles.container}>
      <SignUpStatus />
      <EconomyStatus noColorMode={true} />
    </div>
  );
}
