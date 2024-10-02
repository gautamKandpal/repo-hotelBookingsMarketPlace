const User = require("../model/userSchema");
const queryString = require("query-string");

//stripe
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET);

//1. find user from db
const createConnectAccount = async (req, res) => {
  const user = await User.findById(req.auth._id);
  console.log(user);

  //2. if user dont have stripe_account_id yet,create now
  if (!user.stripe_account_id) {
    //create  stripe_account_id if not have
    const account = await stripe.accounts.create({
      type: "express",
    });
    console.log("ACCOUNT ===>", account);
    user.stripe_account_id = account.id;
    user.save();
  }
  //3. create login link based on account id (for frontend to complete onboarding)
  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: "account_onboarding",
  });

  accountLink = Object.assign(accountLink, {
    "stripe_user[email]": user.email || undefined,
  });
  // console.log("ACCOUNT LINK", accountLink);
  let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  console.log("LINK ==>", link);
  res.send(link);
};

const updateDelayDays = async (accountId) => {
  const account = await stripe.accounts.update(accountId, {
    settings: {
      payouts: {
        schedule: {
          delay_days: 7,
        },
      },
    },
  });
  return account;
};

const getAccountStatus = async (req, res) => {
  // console.log("GET ACCOUNT STATUS");
  const user = await User.findById(req.auth._id).exec();
  // console.log(user);
  const account = await stripe.accounts.retrieve(user.stripe_account_id);
  // console.log("USER ACCOUNT RETRIEVE", account);

  //update delay days
  const updatedAccount = await updateDelayDays(account.id);

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      stripe_seller: updatedAccount,
    },
    { new: true }
  )
    .select("-password")
    .exec();
  // console.log(updatedUser);
  res.json(updatedUser);
};

module.exports = { createConnectAccount, getAccountStatus };
