const express = require("express");
router = express.Router();
const listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { storage } = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({ storage });

const listingController = require("../controller/listing.js");
router
  .route("/")
  .get(wrapAsync(listingController.renderCategoryIndex))
  .post(
    isLoggedIn,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// update
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing)
);
router.post("/search", wrapAsync(listingController.renderSearchResults));
module.exports = router;
