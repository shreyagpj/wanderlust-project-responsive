const express = require("express");
const router = express.Router({ mergeParams: true });

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { schema, reviewSchema } = require("../schema");
const ExpressErr = require("../utils/Err.js");
const asyncWrap = require("../utils/asyncWrap.js");
const { isLoggedIn, isReviewAuthor } = require("../loginCheck.js");

const reviewController = require("../controllers/reviews.js");
function validateReview(req, res, next) {
  let { error } = reviewSchema.validate(req.body.review);
  if (error) {
    throw new ExpressErr(400, error.details[0].message);
  } else {
    next();
  }
}

//post review
router.post("/", validateReview, asyncWrap(reviewController.postReview));

//delete review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  asyncWrap(reviewController.destroyReview),
);

module.exports = router;
