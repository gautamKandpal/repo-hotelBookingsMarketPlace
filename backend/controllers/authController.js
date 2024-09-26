const User = require("../model/userSchema.js");

const register = async (req, res) => {
  // console.log(req.body);
  const { name, email, password } = req.body;

  //validation
  if (!name) {
    return res.status(400).send("Name is required");
  }
  if (!password || password.length < 6) {
    return res
      .status(400)
      .send("Password is required and it should have at least 6 character");
  }
  if (!email) {
    return res.status(400).send("Email is required");
  }

  //checking email exist
  // let userExist = await User.findOne({ email }).exec();
  let userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).send("Email already exist");
  }

  //register user
  const user = new User(req.body);
  try {
    await user.save();
    console.log("USER CREATED ", user);
    return res.json({ message: "User created succesfully" });
  } catch (err) {
    return res.status(400).send("CREATE USER FAILED ", err);
  }
};

module.exports = { register };
