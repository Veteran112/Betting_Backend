const express = require("express");

const users = require("../controllers/users");
const router = express.Router();
const tokenizer = require("../middlewares/tokenizer");
const filer = require("../middlewares/filer");

router.get("/", tokenizer.tokenAccess, users.getList);
router.get("/:id", tokenizer.tokenAccess, users.getOneUser);
router.put("/:id", tokenizer.tokenAccess, users.updateUserSettings);
router.delete("/:id", tokenizer.tokenAccess, users.deleteUser);
router.post("/block", tokenizer.tokenAccess, users.blockUser);
router.post("/create", tokenizer.tokenAccess, users.createUser);

router.post("/sentEmail", users.sentEmail);

module.exports = router;
