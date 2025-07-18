const express = require("express");
const router = express.Router();
const { readKVFile, writeKVFile, kvNamespaces } = require("../utils/kvUtils");

const PART_LIST_FILE = kvNamespaces.PART_LIST;

// 模拟KVNamespace
const KVNamespace = {
  get: (key) => {
    const data = readKVFile(PART_LIST_FILE);
    return data[key] || null;
  },
  put: (key, value) => {
    const data = readKVFile(PART_LIST_FILE);
    data[key] = value;
    writeKVFile(PART_LIST_FILE, data);
  },
};

router.post("/", async (req, res) => {
  try {
    const body = req.body;

    if (!body) {
      return res.status(400).json({ msg: "Error: no request body." });
    }

    // 将报名信息存储到PART_LIST文件中
    KVNamespace.put(body.timestamp.toString(),body.data);

    return res.json({ msg: "Success" });
  } catch (error) {
    console.error("Error in signUpHandler POST:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const timestamp = req.query.timestamp;

    if (timestamp && Date.now() - parseInt(timestamp) < 10000) {
      const list = KVNamespace.list();
      const keys = list.keys;
      const data = {};

      for (const key of keys) {
        data[key.name] = JSON.parse(KVNamespace.get(key.name) || "null");
      }

      return res.json(data);
    }

    res.status(400).json({ msg: "Error: unknown error" });
  } catch (error) {
    console.error("Error in signUpHandler GET:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
