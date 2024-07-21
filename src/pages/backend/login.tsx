import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { useHistory } from "@docusaurus/router";
import Layout from "@site/src/components/backend/Layout";
import LoginCard from "@site/src/components/backend/LoginCard";

export default function Login() {
  const [cookie] = useCookies();
  const isLogon = cookie.email;

  const history = useHistory();

  useEffect(() => {
    if (isLogon) {
      history.push("/backend/");
    }
  }, []);

  return <Layout>{[<LoginCard key={0} />]}</Layout>;
}
