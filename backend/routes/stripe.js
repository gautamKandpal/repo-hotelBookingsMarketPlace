const express = require("express");
const { requireSignin } = require("../middleware");

const { createConnectAccount } = require("../controllers/stripeControllers.js");

const router = express.Router();

router.post("/create-connect-account", requireSignin, createConnectAccount);

module.exports = router;
