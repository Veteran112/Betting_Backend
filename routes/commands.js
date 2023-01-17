const express = require("express");

const commands = require("../controllers/commands");
const router = express.Router();
const tokenizer = require("../middlewares/tokenizer");
const filer = require("../middlewares/filer");

router.get("/:id", tokenizer.tokenAccess, commands.getOneProvider);
router.post("/create", tokenizer.tokenAccess, commands.createCommand);
router.put("/:id", tokenizer.tokenAccess, filer, commands.updateCommand);
router.delete("/:id", tokenizer.tokenAccess, commands.deleteCommand);

module.exports = router;
