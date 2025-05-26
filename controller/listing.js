const listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAPBOX_TOKEN;
const mbxGeocodingClient = mbxGeocoding({ accessToken: mapToken });
// module.exports.index = async (req, res) => {
//   let allListings = await listing.find();
//   res.render("listings/index.ejs", { allListings });
// };

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.renderCategoryIndex = async (req, res) => {
  const category = req.query.category;
  if (!category) {
    let allListings = await listing.find();
    res.render("listings/index.ejs", { allListings });
  } else {
    let allListings = await listing.find({ category: category });
    if (allListings.length === 0) {
      req.flash("error", "No listings found for this category!");
      return res.redirect("/listings");
    } else {
      res.render("listings/index.ejs", { allListings });
    }
  }
};

module.exports.renderSearchResults = async (req, res) => {
  let location = req.body.location;
  let allListings = await listing.find({ location: location });
  if (allListings.length === 0) {
    let allListing = await listing.find({ country: location });
    if (allListing.length === 0) {
      req.flash("error", "No listings found for this location!");
      return res.redirect("/listings");
    } else {
      res.render("listings/index.ejs", { allListings: allListing });
    }
  } else {
    res.render("listings/index.ejs", { allListings });
  }
};

module.exports.createListing = async (req, res) => {
  let response = await mbxGeocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  const listingData = new listing(req.body.listing);
  listingData.image = { filename, url };
  listingData.owner = req.user._id;
  listingData.geometry = response.body.features[0].geometry;
  console.log(listingData);
  await listingData.save();
  req.flash("success", "Successfully created a new listing!");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listings = await listing
    .findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listings) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listings });
};

module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  let listings = await listing.findById(id);
  if (!listings) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }
  let originalImageUrl = listings.image.url;
  let modifyImageurl = originalImageUrl.replace(
    "/upload",
    "/upload/w_250,h_200"
  );
  res.render("listings/edit.ejs", { listings, modifyImageurl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let data = req.body.listing;
  console.log(data);
  await listing.findByIdAndUpdate(id, data, {
    new: true, // Return the updated document
    runValidators: true, // Validate the updated document against the schema
  });
  req.flash("success", "Successfully updated a listing!");
  res.redirect("/listings/" + id);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await listing.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted a listing!");
  res.redirect("/listings");
};
