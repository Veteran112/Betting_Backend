const express = require("express");

const bets = require("../controllers/bets");
const router = express.Router();
const tokenizer = require("../middlewares/tokenizer");

router.get("/", tokenizer.tokenAccess, bets.getList);
router.get("/:id", tokenizer.tokenAccess, bets.getOneBet);

module.exports = router;
