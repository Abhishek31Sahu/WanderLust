const mongoose = require("mongoose");
const schema = mongoose.Schema;

const reviewSchema = new schema({
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Review", reviewSchema);
