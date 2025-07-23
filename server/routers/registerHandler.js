const express = require("express");
const router = express.Router();
const { kvNamespaces, createKVNamespace } = require("../utils/kvUtils");

const KVNamespace_USERS = createKVNamespace(kvNamespaces.USERS);
const KVNamespace_CODE = createKVNamespace(kvNamespaces.REG_CODE);

router.post("/", async (req, res) => {
  try {
    const body = req.body;

    if (!body) {
      return res.status(400).json({ msg: "Error: no request body." });
    }
    
    if (KVNamespace_USERS.get(body.email)) {
      return res.status(400).json({ msg: "Error: user already exists." });
    }

    // 从CODE文件中读取验证码
    const codeData = KVNamespace_CODE.get("0");

    if (body.code !== codeData) {
      return res.status(400).json({ msg: "Error: wrong code." });
    }

    // 将用户信息存储到USERS文件中
    KVNamespace_USERS.put(body.email, body.password);

    return res.json({ msg: "Success" });
  } catch (error) {
    console.error("Error in registerHandler:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
