const express = require("express");
const { login, dashboard } = require("../controller/main");
const authenticationMiddleware = require("../middleware/auth");
const errorHandlerMiddleware = require("../middleware/error-handler");

const router = express.Router();

router.route("/login").post(errorHandlerMiddleware, login);
router.route("/dashboard").get(authenticationMiddleware, dashboard);

module.exports = router;
