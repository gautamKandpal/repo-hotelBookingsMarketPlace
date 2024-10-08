const { expressjwt } = require("express-jwt");
const Hotel = require("../model/hotelsSchema");

const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

const hotelOwner = async (req, res, next) => {
  let hotel = await Hotel.findById(req.params.hotelId);
  //TODO: need to fix the id bug asap
  // console.log("from req.params", req.params);
  // console.log("from hotelOwner", res);
  let owner = hotel.postedBy.id.toString() === req.auth._id.toString();

  if (!owner) {
    return res.status(403).send("Unauthorized");
  }
  next();
};

module.exports = {
  requireSignin,
  hotelOwner,
};
