const express = require("express");
const router = express.Router({ mergeParams: true });

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { schema, reviewSchema } = require("../schema");
const ExpressErr = require("../utils/Err.js");
const asyncWrap = require("../utils/asyncWrap.js");
const { isLoggedIn, isReviewAuthor } = require("../loginCheck.js");

module.exports.postReview = async (req, res) => {
  let { id } = req.params;
  let { review } = req.body;
  console.log(review);
  let newReview = new Review(review);
  newReview.author = res.locals.user._id;
  let listing = await Listing.findById(id);
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "Review posted !");
  res.redirect(`/listings/${id}/view`);
};

module.exports.destroyReview = async (req, res) => {
  let { reviewId, id } = req.params;
  let review = await Review.findByIdAndDelete(reviewId);
  let listing = await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  req.flash("error", "review deleted");
  res.redirect(`/listings/${id}/view`);
};
