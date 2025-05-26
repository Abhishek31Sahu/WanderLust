const express = require("express");
router = express.Router();

const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { isLoggedIn, sessionPath } = require("../middleware.js");

const userController = require("../controller/user.js");

router
  .route("/signup")
  .get(userController.signup)
  .post(wrapAsync(userController.createUser));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    sessionPath,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/users/login",
    }),
    userController.login
  );

router.get("/logout", userController.logout);

router.get("/profile", isLoggedIn, userController.userProfile);
module.exports = router;
