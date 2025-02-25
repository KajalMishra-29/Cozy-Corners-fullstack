const Listing = require("../models/listing");
const Booking = require("../models/booking");
const User = require("../models/user");

module.exports.saveData = async (req, res, next) => {
    const { date, dateStr } = req.body;
    if (!date) {
        return res.status(400).json({ error: "Date is required" });
    }
    req.session.bookDateInfo = { date, dateStr };
    return res.json({ success: true, message: "Date selected successfully" });
}

module.exports.book = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("bookings");
    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect(`/listings/${id}`);
    }
    if (listing.bookingStatus === 'close') {
        req.flash("error", "bookings are close for now");
        return res.redirect(`/listings/${id}`);
    }
    if (!req.session.bookDateInfo) {
        req.flash("error", "Please choose a date for booking");
        return res.redirect(`/listings/${id}`);
    }
    let { date, dateStr } = req.session.bookDateInfo;
    const bookedDates = listing.bookings.map(booking => booking.date.toLocaleDateString("en-CA"));
    console.log(bookedDates);
    if (bookedDates.includes(dateStr)) {
        req.flash("error", "This date is already booked. Please select a different day.")
        return res.redirect(`/listings/${id}`);
    }
    // saving bookings
    const newBooking = new Booking({
        listing: id,
        user: req.user._id,
        date: new Date(date)
    })
    await newBooking.save();
    // push booking into the listing's booking array
    listing.bookings.push(newBooking.id);
    await listing.save();
    // push booking into the user's booking array
    let user = await User.findById(req.user.id);
    user.bookings.push(newBooking.id);
    await user.save();
    req.flash("success", `Your booking for ${dateStr} has been confirmed! We look forward to hosting you.`);
    res.redirect(`/listings/${id}`);
}

module.exports.bookedDates = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("bookings");
    if (!listing) {
        res.json({ error: "No such listing found" });
    }
    const bookedDates = listing.bookings.map(booking => booking.date.toLocaleDateString("en-CA"));
    res.json({ success: true, dates: bookedDates });
}

module.exports.bookingStatus = async (req, res, next) => {
    const { id } = req.params;
    let listing = await Listing.findById(id);
    if (listing.bookingStatus === "open") {
        await Listing.findByIdAndUpdate(id, { bookingStatus: "close" });
        req.flash("success", "Booking status updated to CLOSE")
    } else {
        await Listing.findByIdAndUpdate(id, { bookingStatus: "open" });
        req.flash("success", "Booking status updated to OPEN")
    }
    res.redirect(`/listings/${id}`);
}

module.exports.cancelBooking = async (req, res, next) => {
    const { id, b_id } = req.params;
    // delete this booking from listing and user 
    await Listing.findByIdAndUpdate(id, { $pull: { bookings: b_id } });
    await User.findByIdAndUpdate(req.user._id, { $pull: { bookings: b_id } })
    await Booking.findByIdAndDelete(b_id);
    req.flash("success", "Your booking is cancelled successfully");
    res.redirect(`/listings/${id}`)
}