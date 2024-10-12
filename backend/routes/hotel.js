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
  stripeSessionId,
  userHotelBookings,
  isAlreadyBooked,
} = require("../controllers/hotelController.js");

const router = express.Router();

router.get("/hotels", getHotels);
router.get("/seller-hotels", requireSignin, sellerHotels);
router.get("/hotel/image/:hotelId", image);
router.get("/hotel/:hotelId", read);
router.post("/stripe-session-id", requireSignin, stripeSessionId);
router.post("/create-hotel", requireSignin, formidable(), create);
router.put(
  "/update-hotel/:hotelId",
  requireSignin,
  hotelOwner,
  formidable(),
  updateHotel
);
router.delete("/delete-hotel/:hotelId", requireSignin, hotelOwner, deleteHotel);

//orders
router.get("/user-hotel-bookings", requireSignin, userHotelBookings);
router.get("/is-already-booked/:hotelId", requireSignin, isAlreadyBooked);

module.exports = router;
