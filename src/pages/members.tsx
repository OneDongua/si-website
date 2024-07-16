import Layout from "@theme/Layout";

import MemberProfile from "../components/MemberProfile";
import members from "../data/members.data";

function MemberList() {
  return (
    <div className="row">
      {members.map((member) => {
        return (
          <MemberProfile
            id={member.id}
            name={member.name}
            position={member.position}
            avatar={member.avatar}
            children={member.description}
            githubUrl={member.githubUrl}
            blogUrl={member.blogUrl}
          />
        );
      })}
    </div>
  );
}

function Members() {
  return (
    <Layout title="成员">
      <main>
        <div className="text--center margin-vert--lg">
          <h1>社团成员</h1>
        </div>
        <div className="container">
          <MemberList />
        </div>
        <div className="text--center margin-vert--lg">
          <p>
            <a
              className={"button button--lg button--primary margin-vert--md"}
              href={
                "https://github.com/OneDongua/si-website/edit/main/src/data/members.data.ts"
              }
              target={"_blank"}>
              送我上墙
            </a>
          </p>
        </div>
      </main>
    </Layout>
  );
}

export default Members;
