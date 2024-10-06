const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const hotelsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: "Title is required ",
    },
    content: {
      type: String,
      require: "Content is required",
      maxlength: 10000,
    },
    price: {
      type: Number,
      require: " Price is required",
      trim: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    image: {
      type: Buffer,
      contentType: String,
    },
    from: {
      type: Date,
    },
    to: {
      type: Date,
    },
    bed: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(Hotel, hotelsSchema);
