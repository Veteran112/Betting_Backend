const express = require("express");

const history = require("../controllers/history");
const router = express.Router();
const tokenizer = require("../middlewares/tokenizer");

router.get("/", history.getList);

module.exports = router;
