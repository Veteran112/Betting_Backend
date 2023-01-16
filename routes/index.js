const express = require("express");
const path = require("path");

const swaggerUi = require("swagger-ui-express");

const swaggerDocs = require("../docs");


const router = express.Router();
const content_path = path.resolve(__dirname, "..", "content");
const auth_routes = require("./auth");
const users_routes = require("./users");

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
router.use("/content", express.static(content_path));

router.use("/api/auth", auth_routes);
router.use("/api/users", users_routes);

router.get("/", (req, res) => res.redirect("/docs"));
router.get("*", (req, res) => res.status(404).send("Page not found!"));

module.exports = router;