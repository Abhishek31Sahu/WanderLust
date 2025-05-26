const User = require("../models/user.js");
module.exports.signup = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.createUser = async (req, res) => {
  try {
    let { username, e_mail, password } = req.body;
    const userSchema = new User({ username, e_mail });
    const registerUser = await User.register(userSchema, password);
    req.login(registerUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/users/signup");
  }
};

module.exports.renderLoginForm = async (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to Wanderlust!");
  let redirectUrl = res.locals.redirectURL || "/listings";
  // console.log(res.locals.redirectURL);
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/listings");
  });
};

module.exports.userProfile = (req, res) => {
  res.send(req.user.username);
};
