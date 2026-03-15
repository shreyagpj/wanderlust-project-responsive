const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utils/asyncWrap.js");
const User = require("../models/user.js");
const passport = require("passport");
const { redirectUrlSave } = require("../loginCheck.js");

const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(userController.getSignUpForm)
  .post(userController.submitSignUpForm);

router
  .route("/login")
  .get(userController.getLoginForm)
  .post(
    redirectUrlSave,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.submitLoginForm,
  );

router.get("/logout", userController.logout);

module.exports = router;
