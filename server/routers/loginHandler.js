const express = require("express");
const router = express.Router();
const { kvNamespaces, createKVNamespace } = require("../utils/kvUtils");

const KVNamespace = createKVNamespace(kvNamespaces.USERS);

router.post("/", async (req, res) => {
  try {
    const body = req.body;

    if (!body || !body.email) {
      return res.status(400).json({ msg: "Error: no request body." });
    }

    const userData = KVNamespace.get(body.email);
    if (userData) {
      return res.json(userData);
    } else {
      return res.status(400).json({ msg: "User not found" });
    }
  } catch (error) {
    console.error("Error in loginHandler:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
