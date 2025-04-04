import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { useHistory } from "@docusaurus/router";
import Dashbroad from "@site/src/components/backend/Dashbroad";
import EconomyManager from "@site/src/components/backend/EconomyManager";
import Layout from "@site/src/components/backend/Layout";
import QAManager from "@site/src/components/backend/QAManager";
import VoteResult from "@site/src/components/backend/VoteResult";

export default function Backend() {
  const [cookie] = useCookies();
  const isLogon = cookie.email;

  const history = useHistory();

  useEffect(() => {
    if (!isLogon) {
      history.push("/backend/login");
    }
  }, []);

  return (
    <Layout showIfLogon={true}>
      <Dashbroad key={0} />
      <EconomyManager key={1} />
      <QAManager key={2} />
      <VoteResult key={3} />
    </Layout>
  );
}
