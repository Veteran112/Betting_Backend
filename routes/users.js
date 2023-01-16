const express = require("express");

const users = require("../controllers/users");
const router = express.Router();
const tokenizer = require("../middlewares/tokenizer");
const filer = require("../middlewares/filer");

router.get("/", tokenizer.tokenPipe, users.getList);
router.get("/:id", tokenizer.tokenPipe, users.getOneUser);

router.post(
  "/settings",
  tokenizer.tokenAccess,
  filer,
  users.updateUserSettings
);
router.post("/sentEmail", users.sentEmail);

module.exports = router;
