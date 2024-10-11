const express = require("express");
const { requireSignin } = require("../middleware");

const {
  createConnectAccount,
  getAccountStatus,
  getAccountBalance,
  payoutSetting,
  stripeSuccess,
} = require("../controllers/stripeControllers.js");

const router = express.Router();

router.post("/create-connect-account", requireSignin, createConnectAccount);
router.post("/get-account-status", requireSignin, getAccountStatus);
router.post("/get-account-balance", requireSignin, getAccountBalance);
router.post("/payout-setting", requireSignin, payoutSetting);

//Order
router.post("/stripe-success", requireSignin, stripeSuccess);

module.exports = router;
