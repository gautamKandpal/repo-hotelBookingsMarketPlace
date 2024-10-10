const Hotel = require("../model/hotelsSchema");
const User = require("../model/userSchema");
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET); // Initialize Stripe with your secret key
const fs = require("fs");

const create = async (req, res) => {
  //   console.log("RES Fields", req.fields);
  //   console.log("RES files", req.files);
  // console.log(res);
  try {
    let fields = req.fields;
    let files = req.files;
    let hotel = new Hotel(fields);
    hotel.postedBy = req.auth._id;
    //handle image
    if (files.image) {
      hotel.image.data = fs.readFileSync(files.image.path);
      hotel.image.contentType = files.image.type;
    }

    const result = await hotel.save();
    res.json(result);
    // console.log(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: "Error saving",
    });
  }
};

const image = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId);
  if (hotel && hotel.image.data !== null) {
    res.set("Content-Type", hotel.image.contentType);
    return res.send(hotel.image.data);
  }
};

const getHotels = async (req, res) => {
  let all = await Hotel.find({})
    .limit(24)
    .select("-image.data")
    .populate("postedBy", "_id name");
  // console.log(all);
  res.json(all);
};

const sellerHotels = async (req, res) => {
  let all = await Hotel.find({ postedBy: req.auth._id })
    .select("-image.data")
    .populate("postedBy", "_id name");
  // console.log(all);
  res.send(all);
};

const deleteHotel = async (req, res) => {
  let del = await Hotel.findByIdAndDelete(req.params.hotelId);
  // res.json({ message: "deleted successfully", removed: del });
  res.json(del);
};

const read = async (req, res) => {
  let hotel = await Hotel.findById(req.params.hotelId)
    .populate("postedBy", "_id name")
    .select("-image.data");
  console.log(hotel);
  res.json(hotel);
};

const updateHotel = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;

    let data = { ...fields };
    if (files.image) {
      let image = {};
      image.data = fs.readFileSync(files.image.path);
      image.contentType = files.image.type;

      data.image = image;
    }

    let updated = await Hotel.findByIdAndUpdate(req.params.hotelId, data, {
      new: true,
    }).select("-image.data");
    // console.log("############", updated);
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Hotel update failed. Try again");
  }
};

const stripeSessionId = async (req, res) => {
  try {
    const { hotelId } = req.body;
    const item = await Hotel.findById(hotelId).populate("postedBy");
    const fee = (item.price * 20) / 100;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment", // Specify mode, either 'payment' for one-time or 'subscription' for recurring
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100, // Amount in cents (for USD)
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        application_fee_amount: fee * 100,
        transfer_data: {
          destination: item.postedBy.stripe_account_id, // Destination account ID
        },
      },
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });
    await User.findByIdAndUpdate(req.auth._id, { stripeSession: session });

    console.log("SESSION =====>", session);

    res.send({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  create,
  image,
  getHotels,
  sellerHotels,
  deleteHotel,
  read,
  updateHotel,
  stripeSessionId,
};
