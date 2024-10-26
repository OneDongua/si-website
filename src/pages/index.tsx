import clsx from "clsx";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import EconomyStatus from "@site/src/components/EconomyStatus";
import Heading from "@theme/Heading";
import Layout from "@theme/Layout";

import MemberCounter from "../components/MemberCounter";
import styles from "./styles/index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/sign_up">
            加入我们
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout title={"主页"} description="惠州一中智能信息社">
      <HomepageHeader />
      <main>
        <div className={styles.board}>
          <EconomyStatus />
          <MemberCounter />
        </div>
      </main>
    </Layout>
  );
}
