const express = require("express");
const formidable = require("express-formidable");
const { requireSignin, hotelOwner } = require("../middleware");
const {
  create,
  image,
  getHotels,
  sellerHotels,
  deleteHotel,
} = require("../controllers/hotelController.js");

const router = express.Router();

router.get("/hotels", getHotels);
router.get("/seller-hotels", requireSignin, sellerHotels);
router.get("/hotel/image/:hotelId", image);
router.post("/create-hotel", requireSignin, formidable(), create);
router.delete("/delete-hotel/:hotelId", requireSignin, hotelOwner, deleteHotel);

module.exports = router;
