import Layout from "@theme/Layout";

import SignUpForm from "../components/SignUpForm";
import styles from "./styles/sign_up.module.css";

export default function Signup() {
  const masterSwitch = false; // 总开关，true为开启，false为关闭

  return (
    <Layout title="报名">
      <div className={styles.background}>
        {!masterSwitch && (
          <b className="alert alert--danger shadow--md">❌ 报名已截止</b>
        )}
        <SignUpForm masterSwitch={masterSwitch} autoClear={true} />
      </div>
    </Layout>
  );
}
