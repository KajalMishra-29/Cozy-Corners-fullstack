const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { validateListing, isLoggedIn, isOwner } = require("../middleware");


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
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
}))
// create new listing
router.post("/", validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "new listing created successfully!")
    res.redirect(`/listings/${newListing.id}`);
}))
// update form
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
            req.flash("error", "Listing you requested for does not exist!");
            return res.redirect("/listings");
        }
        res.render("listings/edit.ejs", { listing });
    }))
// edit listing
router.patch("/:id",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        await Listing.findByIdAndUpdate(id, { ...req.body.listing });
        req.flash("success", "changes updated successfully!")
        res.redirect(`/listings/${id}`);
    }))
// delete
router.delete("/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        await Listing.findByIdAndDelete(id);
        req.flash("success", "listing deleted successfully!")
        res.redirect("/listings");
    }))
// change status of booking
router.get("/:id/bookingStatus", wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    if (listing.bookingStatus === "open") {
        await Listing.findByIdAndUpdate(id, { bookingStatus: "close" });
    } else {
        await Listing.findByIdAndUpdate(id, { bookingStatus: "open" });
    }
    res.redirect(`/listings/${id}`);
}))
module.exports = router;
