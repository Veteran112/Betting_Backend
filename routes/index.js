const express = require("express");
const path = require("path");

const swaggerUi = require("swagger-ui-express");

const swaggerDocs = require("../docs");

const router = express.Router();
const content_path = path.resolve(__dirname, "..", "content");
const auth_routes = require("./auth");
const users_routes = require("./users");
const betting_providers = require("./providers");
const betting_commands = require("./commands");
const betting_history = require("./history");
const betting_dashboard = require("./bets");

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
router.use("/content", express.static(content_path));

router.use("/api/auth", auth_routes);
router.use("/api/users", users_routes);
router.use("/api/providers", betting_providers);
router.use("/api/commands", betting_commands);
router.use("/api/history", betting_history);
router.use("/api/bets", betting_dashboard);

router.get("/", (req, res) => res.redirect("/docs"));
router.get("*", (req, res) => res.status(404).send("Page not found!"));

module.exports = router;
