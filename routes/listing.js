const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema")

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

// index
router.get("/", wrapAsync(async (req, res, next) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

// new form
router.get("/new", (req, res) => {
    if (req.isAuthenticated()) {
        res.render("listings/new.ejs");
    } else {
        req.flash("error", "You must be logged in to create a new listing.")
        res.redirect("/login");
    }
})
// show
router.get("/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
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
router.get("/:id/edit", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}))
// update listing
router.patch("/:id", validateListing, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "changes updated successfully!")
    res.redirect(`/listings/${id}`);
}))
// delete
router.delete("/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted successfully!")
    res.redirect("/listings");
}))

module.exports = router;
