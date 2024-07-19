import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { useHistory } from "@docusaurus/router";
import Layout from "@site/src/components/backend/Layout";

import Dashbroad from "../../components/backend/Dashbroad";

export default function Backend() {
  const [cookie] = useCookies();
  const isLogon = cookie.email;

  const history = useHistory();

  useEffect(() => {
    if (!isLogon) {
      history.push("/backend/login");
    }
  }, []);

  return <Layout showIfLogon={true}>{[<Dashbroad key={0} />]}</Layout>;
}
