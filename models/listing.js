const mongoose = require("mongoose");
const Review = require("./review.js");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    filename: String,
    url: String,
  },
  price: {
    type: Number,
    default: 2000,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: "India",
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      // required: true,
    },
    coordinates: {
      type: [Number],
      // required: true,
    },
  },
  category: {
    type: String,
    required: true,
  },
});

schema.post("findOneAndDelete", async (listing) => {
  await Review.deleteMany({ _id: { $in: listing.reviews } });
  console.log("deletion successful");
});

const listing = new mongoose.model("listing", schema);

module.exports = listing;
