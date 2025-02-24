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
    let currUserBookings = [];
    if (req.user) {
        let user = await User.findById(req.user._id).populate("bookings");
        let userBookings = user.bookings;
        currUserBookings = userBookings.filter(booking => booking.listing == id);
    }
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing, currUserBookings });
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
    imageURL = imageURL.replace("/upload", "/upload/h_200,w_250");
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
    req.flash("success", "Your Listing is deleted successfully");
    res.redirect("/");
}
module.exports.search = async (req, res) => {
    let searchTerm = req.body.searchTerm;
    let results = await Listing.find({
        $text: { $search: searchTerm }
    })
    res.render("listings/index.ejs", { allListings: results });
}
module.exports.filters = async (req, res) => {
    let filterType = req.params.filterType;
    let results;
    if (filterType == "trending") {
        // find top 10 trending listings based on no. of bookings and average rating
        results = await Listing.aggregate([
            {
                $addFields: {
                    bookingCount: { $size: "$bookings" }
                }
            },
            {
                $sort: { averageRating: -1, bookingCount: -1 }
            },
            { $limit: 10 }
        ])
    } else {
        results = await Listing.find({ category: `${filterType}` });
    }
    res.render("listings/index.ejs", { allListings: results });
}