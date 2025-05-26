const listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
  const listingData = await listing.findById(req.params.id);

  const reviewData = new Review(req.body.Review);
  reviewData.author = req.user._id;
  listingData.reviews.push(reviewData);
  await listingData.save();
  await reviewData.save();
  req.flash("success", "Successfully created a new review!");
  res.redirect("/listings/" + req.params.id);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted a review!");
  res.redirect("/listings/" + id);
};
