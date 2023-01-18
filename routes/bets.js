const express = require("express");

const bets = require("../controllers/bets");
const router = express.Router();
const tokenizer = require("../middlewares/tokenizer");

router.get("/", tokenizer.tokenAccess, bets.getList);

module.exports = router;
