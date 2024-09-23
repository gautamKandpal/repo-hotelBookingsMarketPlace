const showMessage = (req, res) => {
  res.status(200).send(`from get: ${req.params.message}`);
};

module.exports = showMessage;
