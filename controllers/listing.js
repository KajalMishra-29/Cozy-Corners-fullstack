const Listing = require("../models/listing");
const User = require("../models/user");

module.exports.index = async (req, res, next) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}
module.exports.showListing = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        })
        .populate("owner");

    // bookings for the listing of current user
    let userListingBookings = [];
    if (req.user) {
        let user = await User.findById(req.user._id).populate("bookings");
        let userBookings = user.bookings;
        userListingBookings = userBookings.filter(booking => booking.listing == id);
    }
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing, userListingBookings });
}
module.exports.createListing = async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "new listing created successfully!")
    res.redirect(`/listings/${newListing.id}`);
}
module.exports.updateForm = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    imageURL = listing.image.url;
    imageURL = imageURL.replace("/upload", "/upload/h_230,w_350");
    res.render("listings/edit.ejs", { listing, imageURL });
}
module.exports.updateListing = async (req, res, next) => {
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }
    await listing.save();
    req.flash("success", "changes updated successfully!")
    res.redirect(`/listings/${id}`);
}
module.exports.deleteListing = async (req, res, next) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted successfully!")
    res.redirect("/listings");
}