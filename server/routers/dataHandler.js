const express = require("express");
const router = express.Router();
const { readKVFile, writeKVFile, kvNamespaces } = require("../utils/kvUtils");

const DATA_FILE = kvNamespaces.DATA;

// 模拟KVNamespace
const KVNamespace = {
  get: (key) => {
    const data = readKVFile(DATA_FILE);
    return data[key] || null;
  },
  put: (key, value) => {
    const data = readKVFile(DATA_FILE);
    data[key] = value;
    writeKVFile(DATA_FILE, data);
  },
};

router.post("/", async (req, res) => {
  try {
    const body = req.body;

    if (!body) {
      return res.status(400).json({ msg: "Error: no request body" });
    }

    if (body.get) {
      const what = body.get;
      if (what === "economy") {
        return res.json(KVNamespace.get("__economy") || "{}");
      }
      if (what === "user") {
        return res.json(KVNamespace.get(body.email) || null);
      }
    } else {
      if (body.__economy) {
        KVNamespace.put("__economy", body.__economy);
        return res.json({ msg: "Success" });
      }
    }

    res.status(400).json({ msg: "Error: unknown error" });
  } catch (error) {
    console.error("Error in dataHandler:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
