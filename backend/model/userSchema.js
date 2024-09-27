const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //remove extra spaces before and after
      trim: true,
      required: "Name is required",
    },
    email: {
      type: String,
      trim: true,
      required: "Email is required",
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // minimum 6 and max 20 character length is required
      min: 6,
      max: 20,
    },
    stripe_account_id: {},
    stripe_seller: {},
    stripeSession: {},
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  let user = this; //userSchema
  if (user.isModified("password")) {
    return bcrypt.hash(user.password, 12, function (err, hash) {
      if (err) {
        console.log("BCRYPT HASH ERR: ", err);
        return next(err);
      }
      user.password = hash;

      return next();
    });
  } else {
    return next();
  }
});

userSchema.methods.matchPassword = async function (enterPassword) {
  //compare the enter password with the stored password(db)
  try {
    let checkPassword = await bcrypt.compare(enterPassword, this.password);
    return checkPassword;
  } catch (err) {
    console.log("COMPARE PASSSWORD ERR ==>", err);
  }
};

// userSchema.methods.comparePassword = function (password, next) {
//   bcrypt.compare(password, this.password, function (err, match) {
//     if (err) {
//       console.log("COMPARE PASSWORD ERR", err);
//       return next(err, false);
//     }
//   });
// };

module.exports = mongoose.model("User", userSchema);
