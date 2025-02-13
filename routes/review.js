const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");
const Review = require("../models/review")
const wrapAsync = require("../utils/wrapAsync")
const { validateReview } = require("../middleware");


router.post("/", validateReview, wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New review added successfully!")
    res.redirect(`/listings/${id}`);
}))
router.patch("/:r_id", wrapAsync(async (req, res) => {
    let { id, r_id } = req.params;
    await Review.findByIdAndUpdate(r_id, { ...req.body.review });
    req.flash("success", "review comment updated successfully!")
    res.redirect(`/listings/${id}`);
}))
router.delete("/:r_id", wrapAsync(async (req, res) => {
    let { id, r_id } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: r_id } });
    await Review.findByIdAndDelete(r_id);
    req.flash("success", "review deleted successfully!")
    res.redirect(`/listings/${id}`);
}))

module.exports = router;