const express = require("express");
const router = express.Router();
const { kvNamespaces, createKVNamespace } = require("../utils/kvUtils");

const KVNamespace = createKVNamespace(kvNamespaces.QA);

router.post("/", async (req, res) => {
  try {
    const body = req.body;

    if (!body) {
      return res.status(400).json({ msg: "Error: no request body." });
    }

    if (body.timestamp) {
      KVNamespace.put(body.timestamp, body.data);
      return res.json({ msg: "Success" });
    } else if (body.delete) {
      KVNamespace.delete(body.delete);
      return res.json({ msg: "Success" });
    }

    res.status(400).json({ msg: "Error: unknown error" });
  } catch (error) {
    console.error("Error in qaHandler POST:", error);
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
        data[key.name] = KVNamespace.get(key.name) || null;
      }

      return res.json(data);
    }

    res.status(400).json({ msg: "Error: unknown error" });
  } catch (error) {
    console.error("Error in qaHandler GET:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
