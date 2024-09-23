const express = require("express");
const showMessage = require("../controllers/authController.js");

const router = express.Router();

router.get("/:message", showMessage);

module.exports = router;
