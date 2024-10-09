const express = require("express");
const formidable = require("express-formidable");
const { requireSignin, hotelOwner } = require("../middleware");
const {
  create,
  image,
  getHotels,
  sellerHotels,
  deleteHotel,
  read,
  updateHotel,
} = require("../controllers/hotelController.js");

const router = express.Router();

router.get("/hotels", getHotels);
router.get("/seller-hotels", requireSignin, sellerHotels);
router.get("/hotel/image/:hotelId", image);
router.get("/hotel/:hotelId", read);
router.post("/create-hotel", requireSignin, formidable(), create);
router.put(
  "/update-hotel/:hotelId",
  requireSignin,
  hotelOwner,
  formidable(),
  updateHotel
);
router.delete("/delete-hotel/:hotelId", requireSignin, hotelOwner, deleteHotel);

module.exports = router;
