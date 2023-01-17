const express = require("express");

const providers = require("../controllers/providers");
const router = express.Router();
const tokenizer = require("../middlewares/tokenizer");

router.get("/:id", tokenizer.tokenAccess, providers.getOneProvider);
router.post("/create", tokenizer.tokenAccess, providers.createProvider);
router.put("/:id", tokenizer.tokenAccess, providers.updateProvider);
router.delete("/:id", tokenizer.tokenAccess, providers.deleteProvider);


module.exports = router;
