import clsx from "clsx";
import { useEffect, useState } from "react";

import styles from "./index.module.css";

async function getData() {
  let mData: any;
  await fetch("/api/SignUpHandler?timestamp=" + Date.now().toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((data) => {
      mData = data;
    })
    .catch((error) => {
      console.error(error);
      mData = JSON.parse(
        `{"1726366825111":{"name":"吴嘉俊","classes":"电子3班","email":"823526797@qq.com"},"1726366831526":{"name":"陈境钦","classes":"高一（21）班","email":"2702684491@qq.com"},"1726366890192":{"name":"陈凯量","classes":"高一30班","email":"djfing2@qq.com"},"1726366902970":{"name":"王梓旭","classes":"高一（29）","email":"qylwlj123@outlook.com"},"1726366923573":{"name":"陈境钦","classes":"高一（21）班","email":"2702684491@qq.com"},"1726367054389":{"name":"蚁晓柔","classes":"高一（4）班","email":"gouxiyy@163.com"},"1726367082914":{"name":"杨绪钦","classes":"高一(11)班","email":"a2453674304@126.com"},"1726367116640":{"name":"陈远豪","classes":"高一（29）班","email":"cyhhhhh1234@163.com"},"1726367177817":{"name":"谢承熙","classes":"高一25班","email":"2956197656@qq.com"},"1726367599324":{"name":"张智凯","classes":"高一15","email":"2712797822@qq.com"},"1726367756337":{"name":"曾浩翔","classes":"高一（1）班","email":"z1234h4321x@qq.com"},"1726367901570":{"name":"杨鹏颖","classes":"高一（17）班","email":"2543878455@qq.com"},"1726368336911":{"name":"戴锐","classes":"高一(28）班","email":"3857744596@qq.com"},"1726370603557":{"name":"郭唯一","classes":"高一(11)班","email":"agui4541@caner.hk"},"1726371488727":{"name":"邓鹏","classes":"高一（6）","email":"2489957987@qq.com"},"1726373663328":{"name":"冯瑾轩","classes":"高一（15）班","email":"chouyanga@qq.com"},"1726376010890":{"name":"陈念航","classes":"高一（10）班","email":"2405279375@qq.com"},"1726377422735":{"name":"钟茂航","classes":"高一16班","email":"maomao_2023_081011@126.com"},"1726380073823":{"name":"叶恩杰","classes":"重庆一中高2027届25班","email":"kent@caner.hk"},"1726380352743":{"name":"王子豪","classes":"首都师范大学附属实验学校 初中 七年级4班","email":"xiaoniao@caner.hk"},"1726387574863":{"name":"刘嘉程","classes":"高一（13）班","email":"Ljc1234520@163.com"},"1726393403919":{"name":"宋逸翔","classes":"高一(4)班","email":"1343872169@qq.com"},"1726393758874":{"name":"陈锦焜","classes":"高一(24)班","email":"347192621@qq.com"},"1726402761481":{"name":"刘智亨","classes":"高一（15）班","email":"liuzhiheng081117@163.com"},"1726402944245":{"name":"谢承熙","classes":"高一25班","email":"2956197656@qq.com"},"1726403886109":{"name":"吴睿骁","classes":"高一(21)班","email":"xiaow555@outlook.com"},"1726406628916":{"name":"陈华永","classes":"高一（11）班","email":"chenhuayong090603@outlook.com"},"1726562385575":{"name":"黄靖航","classes":"高一28班","email":"3693200428@qq.com"},"1727081636596":{"name":"刘舰元","classes":"高一（19）","email":"a131_072@163.com"},"1727081705737":{"name":"杨英豪","classes":"1","email":"yang136893@icloud.com"},"1727081754053":{"name":"杨禹澄","classes":"高一(6)班","email":"104522066@qq.com"},"1727081767421":{"name":"孙梓源","classes":"高一(30)班","email":"1433612937@qq.com"},"1727081825059":{"name":"邱子涵","classes":"高一(5)班","email":"3536383718@qq.com"},"1727081846931":{"name":"刘智辰","classes":"高一(30)班","email":"Yun_Hydrogen@outlook.com"},"1727081894817":{"name":"易未晞","classes":"高一(14)班","email":"3363946441@qq.com"},"1727081981458":{"name":"周沛然","classes":"高一(14)班","email":"501055755@qq.com"},"1727082013061":{"name":"马文韬","classes":"高一(4)班","email":"tt15917771081@outlook.com"},"1727082061181":{"name":"刘洋","classes":"3","email":"wood20081013@qq.com"},"1727082084626":{"name":"方若彬","classes":"高一(5)班","email":"3551454963.com"},"1727082104123":{"name":"方若彬","classes":"高一(5)班","email":"3551454963@qq.com"},"1727082168862":{"name":"李喆瀚","classes":"高一(29)班","email":"lzh20090810@163.com"},"1727082192931":{"name":"程奕轩","classes":"高一(29)班","email":"ioscyx@126.com"},"1727082300613":{"name":"谢予涵","classes":"高一(13)班","email":"7905654@qq.com"},"1727082358176":{"name":"周旭东","classes":"高一（14）","email":"nysynysy2@qq.com"},"1727082501114":{"name":"杨琰","classes":"高一(17)班","email":"tim081215without@163.com"},"1727082564369":{"name":"钟励图","classes":"高一(21)班","email":"3140049997@qq.com"},"1727082940843":{"name":"马宗辉","classes":"高一(8)班","email":"1721240254@qq.com"},"1727083079977":{"name":"陈梓灵","classes":"高一(14)班","email":"g3.1415.57931.hzcl@outlook.com"},"1727083161207":{"name":"吴宇轩","classes":"高二15班","email":"yz48320@163.com"},"1727083372083":{"name":"许宸赫","classes":"高一(9)班","email":"xuchenhe@caner.hk"},"1727083526320":{"name":"林煜凯","classes":"高一(30)班","email":"768124410@qq.com"},"1727083659010":{"name":"林忞梁","classes":"高二(30)班","email":"lml2ml@outlook.com"},"1727083932036":{"name":"邓炜腾","classes":"高一(21)班","email":"1271091358@qq.com"},"1727083961157":{"name":"陈冠翰","classes":"高一(25)班","email":"cgh_2021@163.com"},"1727084059784":{"name":"安之卿","classes":"高一(7)班","email":"Azq916071031@163.com"},"1727084616011":{"name":"朱可","classes":"高一(23)班","email":"2508822908@qq.com"},"1727152834155":{"name":"钟茂航","classes":"高一(16)班","email":"18129559215"},"1727152896926":{"name":"黄宇恒","classes":"高一(6)班","email":"15819899961"},"1727153022198":{"name":"杨玉*","classes":"高一(6)班","email":"18003069306"},"1727153120209":{"name":"刘洋","classes":"高一(3)班","email":"wood20081013@qq.com"},"1727153209465":{"name":"古智兴","classes":"高一(4)班","email":"13068230846"},"1727153314679":{"name":"简宇聪","classes":"高一(18)班","email":"jianyc163@163.com"},"1727153411872":{"name":"吴沛齐","classes":"高一(3)班","email":"18169924628"},"1727153639879":{"name":"李同学","classes":"高二(11)班","email":"zac35712@163.com"},"1727153845520":{"name":"陈*月","classes":"高一(5)班","email":"18148890519"},"1727153954911":{"name":"陈坤玄","classes":"高二(11)班","email":"13631945676"},"1727154040577":{"name":"左丞煜","classes":"高一(17)班","email":"13528025468@qq.com"},"1727154145695":{"name":"杨朝翔","classes":"高一(28)班","email":"18107529248"},"1727154194798":{"name":"周旭东","classes":"高一(14)班","email":"13612945244"},"1727154276287":{"name":"陈凯量","classes":"高一(30)班","email":"djfing2@qq.com"},"1727154311504":{"name":"王宁远","classes":"高一(20)班","email":"17819219586"},"1727154345255":{"name":"蔡昊霖","classes":"高一(25)班","email":"13502276663"},"1727154391927":{"name":"华昀飞","classes":"高一(25)班","email":"15089233095"},"1727154442536":{"name":"郭浩聪","classes":"高一(6)班","email":"13979766508@163.com"},"1727154496168":{"name":"刘煜信","classes":"高一(15)班","email":"hsg886@126.com"},"1727154552989":{"name":"罗宇","classes":"高一(8)班","email":"15919382826"},"1727154614548":{"name":"赖业和","classes":"高一(20)班","email":"2507206374@qq.com"},"1727154691305":{"name":"李毅*","classes":"高一(21)班","email":"3536581472@qq.com"},"1727154795752":{"name":"杨鹏颖","classes":"高一(17)班","email":"2543878455@qq.com"},"1727154864353":{"name":"金日杰","classes":"高二(10)班","email":"3633109916@qq.com"},"1727154911593":{"name":"邓元*","classes":"高一(14)班","email":"15018605181"},"1727154956897":{"name":"马*城","classes":"高一(14)班","email":"15363494494"},"1727154988849":{"name":"张阳","classes":"高一(21)班","email":"15707523058"},"1727155051249":{"name":"向文杰","classes":"高一(22)班","email":"13302627553@163.com"},"1727155109938":{"name":"余民诺","classes":"高一(27)班","email":"18664682009"},"1727155222846":{"name":"周同学","classes":"高一(18)班","email":"13437664510"},"1727155268043":{"name":"黄浩铭","classes":"高二(29)班","email":"136949311914"},"1727155331955":{"name":"台伟维","classes":"高二(29)班","email":"15119088554"},"1727155475524":{"name":"安之卿","classes":"高一(7)班","email":"azq916071031@163.com"},"1727155710198":{"name":"刘智辰","classes":"高一(30)班","email":"Yun_Hydrogen@outlook.com"},"1727155747488":{"name":"方若彬","classes":"高一(5)班","email":"13414754349"},"1727155783344":{"name":"邓斯华","classes":"高一(2)班","email":"13556279524"},"1727155830966":{"name":"王梓旭","classes":"高一(29)班","email":"qylwlj123@outlook.com"},"1727155882939":{"name":"邱子涵","classes":"高一(5)班","email":"3536383718@qq.com"},"1727156021448":{"name":"曾乙航","classes":"高一(4)班","email":"*"},"1727156065747":{"name":"刘玮杰","classes":"高一(1)班","email":"yjpluser@163.com"},"1727156121917":{"name":"戴锐","classes":"高一(28)班","email":"3857744596@qq.com"},"1727156225330":{"name":"源俊","classes":"高一(5)班","email":"15768464001"},"1727156274493":{"name":"邓炎锋","classes":"高一(12)班","email":"15360128098"},"1727156394483":{"name":"张秦玮","classes":"高一(24)班","email":"18026688608"},"1727156435259":{"name":"钟音林","classes":"高一(24)班","email":"13414657136"},"1727156552288":{"name":"雪昌泽","classes":"高一(20)班","email":"13719679498"},"1727156606955":{"name":"董浩楷","classes":"高一(16)班","email":"2946343202@qq.com"},"1727156666518":{"name":"张智凯","classes":"高一(15)班","email":"2712797822@qq.com"},"1727156741657":{"name":"叶子玮","classes":"高一(16)班","email":"13610430673"},"1727156776623":{"name":"李诗楠","classes":"高一(15)班","email":"lishinan636@outlook.com"},"1727156823582":{"name":"严彩文","classes":"高一(6)班","email":"13422984547"},"1727156859478":{"name":"吴宇轩","classes":"高二(15)班","email":"14779218320"},"1727156998703":{"name":"陈冠翔","classes":"高一(25)班","email":"15768798610"},"1727157046031":{"name":"向凌","classes":"高一(17)班","email":"15768856273"},"1727238067128":{"name":"韦同学","classes":"高一（20）班","email":"13202303232"},"1727238121159":{"name":"唐紫嫣","classes":"高一(9)班","email":"1307528653"},"1727238167803":{"name":"吴家媛","classes":"高一(26)班","email":"14776547224"},"1727238212001":{"name":"颜楚阳","classes":"高一(11)班","email":"18026618086"},"1727238258154":{"name":"赵启正","classes":"高一(22)班","email":"13422414191"},"1727238324052":{"name":"杨英豪","classes":"高一(1)班","email":"yang136893@icloud.com"},"1727241517989":{"name":"方向","classes":"高一(10)班","email":"14784411906"},"1727620866616":{"name":"冯昭博","classes":"高一（1）班","email":"fengzhaobobo520@qq.com"},"1727684719541":{"name":"冯昭博","classes":"高一（1）班","email":"fengzhaobobo@qq.com"}}`
      );
    });
  return mData;
}
export default function SignUpStatus() {
  const [data, setData] = useState(null);

  async function getAndSetData() {
    setData(await getData());
  }

  /* useEffect(() => {
    getAndSetData();
  }, []); */

  return (
    <div className={clsx("card shadow--md", styles.card)}>
      {data ? (
        <table className={styles.table}>
          <caption className="hero__subtitle text--bold padding--sm">
            报名人员
          </caption>
          <thead>
            <tr>
              <th scope="col">姓名</th>
              <th scope="col">班级</th>
              <th scope="col">邮箱</th>
              <th scope="col">时间</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              Object.keys(data).map((key) => {
                return (
                  <tr>
                    <th scope="row">{data[key].name}</th>
                    <td>{data[key].classes}</td>
                    <td>{data[key].email}</td>
                    <td>{new Date(Number.parseInt(key)).toLocaleString()}</td>
                  </tr>
                );
              })}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colSpan={3}>
                总计
              </th>
              <td>{data && Object.keys(data).length}</td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <button
          className={clsx("button button--primary", styles.load)}
          onClick={getAndSetData}>
          加载数据
        </button>
      )}
    </div>
  );
}
