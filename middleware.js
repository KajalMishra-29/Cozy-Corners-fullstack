const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError")
const { listingSchema, reviewSchema, userSchema } = require("./schema");
const Booking = require("./models/booking");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in!");
        return res.redirect("/login");
    }
    next();
}
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl;
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
}
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
}
module.exports.validateUser = (req, res, next) => {
    let { error } = userSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error);
    } else {
        next();
    }
}
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    // listing.owner.toString() !== req.user._id.toString() 
    if (!listing.owner.equals(req.user._id)) {
        req.flash("error", "Access denied: You do not have the required permissions.");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, r_id } = req.params;
    let review = await Review.findById(r_id);
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "Access denied: You do not have the required permissions.");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module, exports.isBookingAuthor = async (req, res, next) => {
    let { id, b_id } = req.params;
    let booking = await Booking.findById(b_id);
    if (!booking.user.equals(req.user._id)) {
        req.flash("error", "Access denied: You do not have the required permissions.");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
