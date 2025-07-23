const express = require("express");
const router = express.Router();
const { kvNamespaces, createKVNamespace } = require("../utils/kvUtils");

const KVNamespace = createKVNamespace(kvNamespaces.DATA);

router.post("/", async (req, res) => {
  try {
    const body = req.body;

    if (!body) {
      return res.status(400).json({ msg: "Error: no request body" });
    }

    if (body.get) {
      const what = body.get;
      if (what === "economy") {
        return res.json(KVNamespace.get("__economy") || {});
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
