const { expressjwt } = require("express-jwt");
const Hotel = require("../model/hotelsSchema");

//req.user
const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

const hotelOwner = async (req, res, next) => {
  let hotel = await Hotel.findById(req.params.hotelId);
  let owner = hotel.postedBy._id.toString() === req.auth._id.toString();

  if (!owner) {
    return res.status(403).send("Unauthorized");
  }
  next();
};

module.exports = {
  requireSignin,
  hotelOwner,
};
