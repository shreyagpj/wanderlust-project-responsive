const express = require("express");
const asyncWrap = require("../utils/asyncWrap.js");
const User = require("../models/user.js");
const passport = require("passport");
const { redirectUrlSave } = require("../loginCheck.js");

module.exports.getSignUpForm = (req, res) => {
  res.render("./users/signup.ejs");
};

module.exports.submitSignUpForm = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    let newUser = { username, email };
    newUser = await User.register(newUser, password);
    console.log(newUser);
    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Sign up was successful");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/login");
  }
};

module.exports.getLoginForm = (req, res) => {
  res.render("./users/login.ejs");
};

module.exports.submitLoginForm = (req, res) => {
  req.flash("success", "Welcome back to Wanderlust !");
  let redirectUrl = res.locals.redirectUrl;
  if (!redirectUrl || redirectUrl.includes("_method")) {
    redirectUrl = "/listings";
  }
  console.log("Login controller reached");
  console.log(redirectUrl);
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "User successfully logged out");
    res.redirect("/listings");
  });
};
