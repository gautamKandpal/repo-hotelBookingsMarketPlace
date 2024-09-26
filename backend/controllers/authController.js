const showMessage = (req, res) => {
  res.status(200).send(`from get: ${req.params.message}`);
};

const register = async (req, res) => {
  console.log(req.body);
};

module.exports = { showMessage, register };
