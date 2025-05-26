const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Review = require("./review.js");
const listingSchema = new schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  image: {
    filename: { type: String },
    url: { type: String },
  },

  country: { type: String, required: true },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: { type: Date, default: Date.now() },
  category: {
    type: String,
    enum: [
      "trending",
      "iconic-cities",
      "mountain-city",
      "castles",
      "amazing-pools",
      "beachfront",
      "lakeside",
      "ski-in-out",
      "unique-stays",
      "camping",
      "farms",
      "arctic",
      "treehouses",
      "rooms",
    ],
    required: true,
    lowercase: true,
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
