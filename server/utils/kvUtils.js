const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");

const kvNamespaces = {
  DATA: "data.json",
  USERS: "users.json",
  REG_CODE: "reg_code.json",
  PART_LIST: "part_list.json",
  QA: "qa.json",
  VOTE: "vote.json",
};

const readKVFile = (fileName) => {
  const filePath = path.join(DATA_DIR, fileName);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const writeKVFile = (fileName, data) => {
  const filePath = path.join(DATA_DIR, fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const createKVNamespace = (namespace) => {
  return {
    get: (key) => {
      const data = readKVFile(namespace);
      return data[key] || null;
    },
    put: (key, value) => {
      const data = readKVFile(namespace);
      data[key] = value;
      writeKVFile(namespace, data);
    },
    delete: (key) => {
      const data = readKVFile(namespace);
      delete data[key];
      writeKVFile(namespace, data);
    },
    list: () => {
      const data = readKVFile(namespace);
      return {
        keys: Object.keys(data).map((key) => ({ name: key })),
      };
    },
  };
};

module.exports = {
  // 读取KV文件
  readKVFile,

  // 写入KV文件
  writeKVFile,

  // KV命名空间文件
  kvNamespaces,

  // 创建KVNamespace模拟方法
  createKVNamespace,
};
