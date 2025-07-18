const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { kvNamespaces } = require("./utils/kvUtils");

// 创建数据目录
const DATA_DIR = path.join(__dirname, "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// 初始化KV文件
Object.values(kvNamespaces).forEach((file) => {
  const filePath = path.join(DATA_DIR, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "{}");
  }
});

const app = express();
app.use(cors());
app.use(express.json());

// 挂载路由
const routes = {
  DataHandler: require("./routers/dataHandler"),
  LoginHandler: require("./routers/loginHandler"),
  QAHandler: require("./routers/qaHandler"),
  RegisterHandler: require("./routers/registerHandler"),
  SignUpHandler: require("./routers/signUpHandler"),
  VoteHandler: require("./routers/voteHandler"),
};

Object.keys(routes).forEach((route) => {
  app.use(`/api/${route}`, routes[route]);
});

app.use(express.static(path.join(__dirname, "..", "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
