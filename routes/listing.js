const express = require("express");
const router = express.Router();
const { schema, reviewSchema } = require("../schema");
const ExpressErr = require("../utils/Err.js");
const asyncWrap = require("../utils/asyncWrap.js");
const { isLoggedIn, isOwner } = require("../loginCheck.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");

require("dotenv").config();

const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

function validateListing(req, res, next) {
  let { error } = schema.validate(req.body.listing);
  if (error) {
    throw new ExpressErr(400, error.details[0].message);
  } else {
    next();
  }
}

router
  .route("/listings")
  .get(asyncWrap(listingController.getAllListings))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    asyncWrap(listingController.postListing),
  );
// .post(upload.single("listing[image]"), (req, res) => {
//   res.send(req.file);
// });

router.get("/listings/new", isLoggedIn, listingController.newListingForm);

router.get("/listings/search", listingController.searchListing);

router.get("/listings/:id/view", asyncWrap(listingController.showListing));

router.get(
  "/listings/:id/edit",
  isLoggedIn,
  isOwner,
  asyncWrap(listingController.getEditForm),
);

router
  .route("/listings/:id")
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    asyncWrap(listingController.editListing),
  )
  .delete(isLoggedIn, isOwner, asyncWrap(listingController.destroyListing));

router.get(
  "/listings/category/:currCategory",
  asyncWrap(listingController.categoryFilter),
);
module.exports = router;
