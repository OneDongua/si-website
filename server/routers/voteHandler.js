const express = require("express");
const router = express.Router();
const { kvNamespaces, createKVNamespace } = require("../utils/kvUtils");

const KVNamespace = createKVNamespace(kvNamespaces.VOTE);

router.post("/", async (req, res) => {
  try {
    const body = req.body;

    if (!body) {
      return res.status(400).json({ msg: "Error: no request body." });
    }

    const type = req.query.type;

    if (type === "data") {
      KVNamespace.put("datas", body);
    } else {
      for (const id of Object.keys(body)) {
        KVNamespace.put(id + "+" + Date.now(), body[id]);
      }
    }

    return res.json({ msg: "Success" });
  } catch (error) {
    console.error("Error in voteHandler POST:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const timestamp = req.query.timestamp;
    const type = req.query.type;
    const id = req.query.id;

    if (timestamp && Date.now() - parseInt(timestamp) < 10000) {
      if (!type) return res.status(400).json({ msg: "Error: unknown type" });

      if (type === "calc") {
        const list = KVNamespace.list();
        const keys = list.keys;
        const data = {};

        for (const key of keys) {
          if (/^\d+\+\d+$/.test(key.name)) {
            const [voteId, _] = key.name.split("+");
            const items = KVNamespace.get(key.name) || [];

            for (const item of items) {
              if (!data[voteId]) data[voteId] = {};
              if (!data[voteId][item]) data[voteId][item] = 0;
              data[voteId][item] += 1;
            }
          }
        }

        return res.json(data);
      } else if (type === "get") {
        const data = KVNamespace.get("datas") || {};
        return res.json(data);
      } else if (type === "delete") {
        if (!id) return res.status(400).json({ msg: "Error: no id provided." });

        const datas = KVNamespace.get("datas") || {};
        if (datas) {
          delete datas[id];
          KVNamespace.put("datas", datas);
        }

        const list = KVNamespace.list();
        for (const key of list.keys) {
          if (key.name.startsWith(id + "+")) {
            KVNamespace.delete(key.name);
          }
        }

        return res.json({ msg: "Success" });
      }
    }

    res.status(400).json({ msg: "Error: unknown error" });
  } catch (error) {
    console.error("Error in voteHandler GET:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
