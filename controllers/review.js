const Listing = require("../models/listing");
const Review = require("../models/review")

module.exports.createReview = async (req, res, next) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user.id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    await updateAverageRating(id);

    req.flash("success", "New review added successfully!")
    res.redirect(`/listings/${id}`);
}

module.exports.deleteReview = async (req, res) => {
    let { id, r_id } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: r_id } });
    await Review.findByIdAndDelete(r_id);

    await updateAverageRating(id);

    req.flash("success", "review deleted successfully!")
    res.redirect(`/listings/${id}`);
}

async function updateAverageRating(id) {
    let listing = await Listing.findById(id).populate("reviews");
    if (listing.reviews.length === 0) {
        listing.averageRating = 0;
    } else {
        const tAvg = listing.reviews.reduce((sum, review) => sum + review.rating, 0);
        listing.averageRating = tAvg / listing.reviews.length;
    }
    await listing.save();
}