const express = require("express");
const router = express.Router();
const user = require("../models/user");
const Listing = require("../models/listing.js");
const { schema, reviewSchema } = require("../schema");
const ExpressErr = require("../utils/Err.js");
const asyncWrap = require("../utils/asyncWrap.js");
const { isLoggedIn, isOwner } = require("../loginCheck.js");
const listingController = require("../controllers/listings.js");
const listing = require("../models/listing.js");

const { coordinates } = require("../utils/coordinates.js");

module.exports.getAllListings = async (req, res) => {
  let list = await Listing.find({});
  res.render("listings/index.ejs", { list });
};

module.exports.postListing = async (req, res) => {
  let { listing } = req.body;
  let url = req.file.path;
  let filename = req.file.filename;
  // let result = schema.validate(listing);
  // if (result.error) {
  //     throw new ExpressErr(400, result.error.details[0].message);
  // }
  listing.owner = req.user._id;
  listing.image = {
    url,
    filename,
  };
  listing.geometry = await coordinates(listing.location);
  await new Listing(listing).save();
  console.log(listing);
  req.flash("newlisting", "New Listing has been created!");
  res.redirect("/listings");
};

module.exports.newListingForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: "author" })
    .populate("owner");
  // console.log(listing);
  res.render("listings/show.ejs", { listing });
};

module.exports.getEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  let originalImage = listing.image.url;
  originalImage = originalImage.replace("/upload", "/upload/w_300");
  res.render("listings/edit.ejs", { listing, originalImage });
};

module.exports.editListing = async (req, res, next) => {
  let { id } = req.params;

  if (!req.body.listing) {
    return next(new ExpressErr(400, "Bad request"));
  }

  delete req.body.listing.image;

  let listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true },
  );

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    await listing.save();
  }

  res.redirect(`/listings/${id}/view`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("error", "Listing deleted");
  res.redirect("/listings");
};

module.exports.categoryFilter = async (req, res) => {
  let { currCategory } = req.params;
  let list = await Listing.find({
    category: { $regex: new RegExp(`^${currCategory}$`, "i") },
  });
  res.render("listings/category.ejs", { currCategory, list });
};

module.exports.searchListing = async (req, res) => {
  let keywords = req.query.keywords;

  let list = await Listing.find({
    $or: [
      { title: { $regex: keywords, $options: "i" } },
      { description: { $regex: keywords, $options: "i" } },
    ],
  });

  res.render("listings/index.ejs", { list });
};
