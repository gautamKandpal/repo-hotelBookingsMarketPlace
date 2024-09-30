const createConnectAccount = async (req, res) => {
  console.log("REQ USER FROM REQUIRE SIGNIN MIDDLEWARE", req.auth);
  console.log("YOU HIT CREATE CONNECT ACCOUNT");
};

module.exports = { createConnectAccount };
