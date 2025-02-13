const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const User = require("../models/user");
const { validateListing, isLoggedIn } = require("../middleware");


// index
router.get("/", wrapAsync(async (req, res, next) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));
// new form
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
})
// show
router.get("/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate("reviews")
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}))
// create new listing
router.post("/", validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "new listing created successfully!")
    res.redirect("/listings");
}))
// update form
router.get("/:id/edit", isLoggedIn, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}))
// update listing
router.patch("/:id", isLoggedIn, validateListing, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "changes updated successfully!")
    res.redirect(`/listings/${id}`);
}))
// delete
router.delete("/:id", isLoggedIn, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted successfully!")
    res.redirect("/listings");
}))

module.exports = router;
