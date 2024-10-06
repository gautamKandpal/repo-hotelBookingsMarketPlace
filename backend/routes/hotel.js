const express = require("express");
const formidable = require("express-formidable");
const { requireSignin } = require("../middleware");
const { create } = require("../controllers/hotelController.js");

const router = express.Router();

router.post("/create-hotel", requireSignin, formidable(), create);

module.exports = router;
