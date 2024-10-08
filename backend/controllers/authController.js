const User = require("../model/userSchema.js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validation
    if (!name) {
      return res.status(400).send("Name is required");
    }
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required and it should have at least 6 characters");
    }
    if (!email) {
      return res.status(400).send("Email is required");
    }

    // Check if email already exists
    let userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send("Email already exists");
    }

    // Register user
    const user = new User(req.body);
    try {
      await user.save();
      console.log("USER CREATED ", user);
      return res.json({ message: "User created successfully" });
    } catch (err) {
      return res.status(400).send("CREATE USER FAILED");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user with the mail exist
    let user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).send("User with the email not found");
    }

    // compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).send("Wrong password");
    }
    console.log("GENERATE A TOKEN");
    //Generate a token then send as response to client
    let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        stripe_account_id: user.stripe_account_id,
        stripe_seller: user.stripe_seller,
        stripeSession: user.stripeSession,
      },
    });
  } catch (err) {
    console.log("LOGIN ERROR", err);
    res.status(400).send("Signin failed");
  }
};

module.exports = { register, login };
