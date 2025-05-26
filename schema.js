const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    location: Joi.string().required(),
    image: Joi.object({
      filename: Joi.string(),
      url: Joi.string(),
    }).optional(),
    country: Joi.string().required(),
    category: Joi.string()
      .valid(
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
        "rooms"
      )
      .required(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  Review: Joi.object({
    comment: Joi.string().required(),
    rating: Joi.number().required().min(1).max(5),
  }).required(),
});
