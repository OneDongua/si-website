const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");

// 初始化KV命名空间文件
const kvNamespaces = {
  DATA: "data.json",
  USERS: "users.json",
  REG_CODE: "reg_code.json",
  PART_LIST: "part_list.json",
  QA: "qa.json",
  VOTE: "vote.json",
};

module.exports = {
  // 读取KV文件
  readKVFile(fileName) {
    const filePath = path.join(DATA_DIR, fileName);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  },

  // 写入KV文件
  writeKVFile(fileName, data) {
    const filePath = path.join(DATA_DIR, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  },

  // KV命名空间文件
  kvNamespaces,
};
