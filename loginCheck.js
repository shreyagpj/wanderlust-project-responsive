const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to access this feature");
    return res.redirect("/login");
  }
  next();
};

module.exports.redirectUrlSave = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
    delete req.session.redirectUrl;
  } else {
    res.locals.redirectUrl = "/listings";
  }
  console.log(res.locals.redirectUrl);
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let element = await Listing.findById(id);
  console.log(element);
  console.log(res.locals.user);
  if (!element.owner.equals(res.locals.user._id)) {
    req.flash("error", "You are not the owner of this listing");
    return res.redirect(`/listings/${id}/view`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let element = await Review.findById(reviewId);
  if (!element.author.equals(res.locals.user._id)) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listings/${id}/view`);
  }
  next();
};
