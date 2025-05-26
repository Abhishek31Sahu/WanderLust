const { required } = require("joi");
const listing = require("./models/listing.js");
const review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // console.log(req.Url.path);
    req.session.redirectUrl = req._parsedOriginalUrl.path;
    console.log(req._parsedOriginalUrl.path);
    req.flash("error", "You must be signed in first!");
    return res.redirect("/users/login");
  }
  next();
};

module.exports.sessionPath = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectURL = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listings = await listing.findById(id);
  if (!listings.owner.equals(res.locals.currentUser._id)) {
    req.flash("error", "You don't have permission to edit this listing!");
    return res.redirect("/listings/" + id);
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  let { reviewId } = req.params;
  let Review = await review.findById(reviewId);
  if (!Review.author.equals(res.locals.currentUser._id)) {
    req.flash("error", "You don't have permission to delete review!");
    return res.redirect("/listings/" + id);
  }
  next();
};

module.exports.validateListing = (req, res, next) => {
  if (typeof req.file !== "undefined") {
    req.body.listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }
  console.log(req.body.listing);
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};
