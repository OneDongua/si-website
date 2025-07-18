const express = require("express");
const router = express.Router();
const { readKVFile, writeKVFile, kvNamespaces } = require("../utils/kvUtils");

const USERS_FILE = kvNamespaces.USERS;
const CODE_FILE = kvNamespaces.REG_CODE;

// 模拟KVNamespace
const KVNamespace = {
  get: (key) => {
    const data = readKVFile(USERS_FILE);
    return data[key] || null;
  },
  put: (key, value) => {
    const data = readKVFile(USERS_FILE);
    data[key] = value;
    writeKVFile(USERS_FILE, data);
  },
};

// 模拟CODE KVNamespace
const CODE_KVNamespace = {
  get: (key) => {
    const data = readKVFile(CODE_FILE);
    return data[key] || null;
  },
};

router.post("/", async (req, res) => {
  try {
    const body = req.body;

    if (!body) {
      return res.status(400).json({ msg: "Error: no request body." });
    }

    // 从CODE文件中读取验证码
    const codeData = CODE_KVNamespace.get("0");

    if (body.code !== codeData) {
      return res.status(400).json({ msg: "Error: wrong code." });
    }

    // 将用户信息存储到USERS文件中
    KVNamespace.put(body.email, body.password);

    return res.json({ msg: "Success" });
  } catch (error) {
    console.error("Error in registerHandler:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
