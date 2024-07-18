import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { useHistory } from "@docusaurus/router";
import Layout from "@site/src/components/backend/Layout";
import LoginCard from "@site/src/components/backend/LoginCard";
import RegisterCodeGenerator from "@site/src/components/backend/RegisterCodeGenerator";

import Dashbroad from "../../components/backend/Dashbroad";

function Backend() {
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
      {[<Dashbroad />, <RegisterCodeGenerator />]}
    </Layout>
  );
}

export default Backend;
