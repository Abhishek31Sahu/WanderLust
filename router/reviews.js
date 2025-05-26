const express = require("express");
router = express.Router({ mergeParams: true });
const listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isAuthor } = require("../middleware.js");

const reviewController = require("../controller/review.js");

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
