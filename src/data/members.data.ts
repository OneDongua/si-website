interface Member {
  id: number;
  name: string;
  position: string;
  avatar?: string;
  description: string;
  githubUrl?: string;
  blogUrl?: string;
}

let members: Member[] = [
  {
    id: 0,
    name: "李华",
    position: "黑奴",
    description: "简介",
    githubUrl: "https://github.com/",
    blogUrl: "https://blog.csdn.net/",
  },
  {
    id: 1,
    name: "李华",
    position: "黑奴",
    description: "简介",
    githubUrl: "https://github.com/",
    blogUrl: "https://blog.csdn.net/",
  },
  {
    id: 2,
    name: "李华",
    position: "黑奴",
    description: "简介",
    githubUrl: "https://github.com/",
    blogUrl: "https://blog.csdn.net/",
  },
  {
    id: 3,
    name: "李华",
    position: "黑奴",
    description: "简介",
    githubUrl: "https://github.com/",
    blogUrl: "https://blog.csdn.net/",
  },
];

export default members;
