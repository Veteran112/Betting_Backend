const express = require("express");

const history = require("../controllers/history");
const router = express.Router();
const tokenizer = require("../middlewares/tokenizer");

router.get("/:id", tokenizer.tokenAccess, history.getList);

module.exports = router;
