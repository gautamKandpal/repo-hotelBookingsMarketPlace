const { expressjwt } = require("express-jwt");

const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

module.exports = {
  requireSignin,
};
