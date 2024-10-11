const User = require("../model/userSchema");
const Order = require("../model/orderSchema");
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

const getAccountBalance = async (req, res) => {
  const user = await User.findById(req.auth._id);
  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id,
    });
    // console.log("BALANCE ==>", balance);
    res.json(balance);
  } catch (err) {
    console.log("ERROR FROM GETACCOUNTBAL ==> ", err);
  }
};

const payoutSetting = async (req, res) => {
  try {
    const user = await User.findById(req.auth._id);

    const loginLink = await stripe.accounts.createLoginLink(
      user.stripe_account_id,
      {
        redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL,
      }
    );
    // console.log("LOGIN LINK FOR PAYOUT SETTING", loginLink);
    res.json(loginLink);
  } catch (err) {
    console.log("STRIPE PAYOUT SETTING ERR ==> ", err);
  }
};

const stripeSuccess = async (req, res) => {
  try {
    const { hotelId } = req.body;
    const user = await User.findById(req.auth._id);
    // check if userhas stripe session
    if (!user.stripeSession) return;
    // console.log("User ----> ", user);
    //retrieve stripe session based on session_id
    const session = await stripe.checkout.sessions.retrieve(
      user.stripeSession.id
    );
    // console.log("session ---->", session);
    if (session.payment_status === "paid") {
      //check if order with that session id already exist by querying orders collection
      const orderExist = await Order.findOne({ "session.id": session.id });
      if (orderExist) {
        res.json({
          success: true,
        });
      } else {
        //create new order and send success: true
        let newOrder = await new Order({
          hotel: hotelId,
          session,
          orderedBy: user._id, //auth._id
        }).save();
        //remove user's stripeSession
        // console.log("from new Order", newOrder);
        await User.findByIdAndUpdate(user._id, {
          $set: {
            stripeSession: {},
          },
        });

        res.json({ success: true });
      }
    }
  } catch (err) {
    console.log("Stripe success error: ", err);
  }
};

module.exports = {
  createConnectAccount,
  getAccountStatus,
  getAccountBalance,
  payoutSetting,
  stripeSuccess,
};
