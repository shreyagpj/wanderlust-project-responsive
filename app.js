require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Review = require("./models/review.js");
const Listing = require("./models/listing.js");
const ExpressErr = require("./utils/Err.js");
const asyncWrap = require("./utils/asyncWrap.js");
const joi = require("joi");
const { schema, reviewSchema } = require("./schema");
const listingRoutes = require("./routes/listing.js");
const reviewRoutes = require("./routes/review.js");
const userRoutes = require("./routes/user.js");
const dbUrl = process.env.ATLAS_URL;

const app = express();
let port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => console.log("Connection successful"))
  .catch((err) => console.log(err));

//connect mongo
const MongoStore = require("connect-mongo").default;

const store = MongoStore.create({
  mongoUrl: process.env.ATLAS_URL,
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Mongo session error:", err);
});

const sessionObj = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
};

// const sessionObj = {
//   store,
//   resave: false,
//   secret: process.env.SECRET,
//   saveUninitialized: true,
//   cookie: {
//     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//   },
// };

app.use(session(sessionObj));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/test", (req, res) => {
  res.send(req.session);
});

app.get("/demouser", async (req, res, next) => {
  let newUser = new User({
    email: "shreya-user1@gmail.com",
    username: "user1",
  });

  await User.register(newUser, "user1", (err, user) => {
    if (err) {
      console.log(err);
    }
    res.send(user);
  });
  res.send(newUser);
});

app.use((req, res, next) => {
  console.log("we are in res.locals");
  res.locals.msg = req.flash("newlisting");
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  res.locals.user = req.user;
  next();
});

app.use("/", listingRoutes);
app.use("/listings/:id/review", reviewRoutes);
app.use("/", userRoutes);

app.use((req, res, next) => {
  next(new ExpressErr(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something went wrong" } = err;
  res.status(statusCode).render("listings/error.ejs", { message });
});

app.listen(port, () => {
  console.log("server started");
});
