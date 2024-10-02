const express = require("express");
const { requireSignin } = require("../middleware");

const {
  createConnectAccount,
  getAccountStatus,
} = require("../controllers/stripeControllers.js");

const router = express.Router();

router.post("/create-connect-account", requireSignin, createConnectAccount);

router.post("/get-account-status", requireSignin, getAccountStatus);

module.exports = router;
