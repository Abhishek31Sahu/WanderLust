if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

console.log(process.env.CLOUD_API_SECRET);

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const methodoverride = require("method-override");
const ejsMate = require("ejs-mate");
const listings = require("./router/listings.js");
const reviews = require("./router/reviews.js");
const users = require("./router/users.js");
const session = require("express-session");
const mongoConnect = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const User = require("./models/user.js");
const localStrategy = require("passport-local");
const DBURL = process.env.ATLASDB_URL;
async function main() {
  try {
    await mongoose.connect(DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout for initial connection
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
      retryWrites: true,
      w: "majority",
    });
    console.log("Successfully connected to MongoDB Atlas");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
}

// Connection event handlers
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Mongoose connection closed due to app termination");
  process.exit(0);
});

// Execute connection
main()
  .then(() => {
    // Your application logic can start here
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = mongoConnect.create({
  mongoUrl: DBURL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 60 * 60, // 1 day
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success"); // Get flash message
  res.locals.errorMsg = req.flash("error"); // Get flash message
  res.locals.currentUser = req.user; // Get current user
  next();
});

app.use("/listings", listings);

app.use("/listings/:id/review", reviews);

app.use("/users", users);

app.all("*", (req, res, next) => {
  res.render("listings/error.ejs");
  // next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;
  // res.status(statusCode).send(message);
  console.log(err);
  res.render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
