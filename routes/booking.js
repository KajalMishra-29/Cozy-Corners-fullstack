const express = require("express")
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync")
const Listing = require("../models/listing");
const Booking = require("../models/booking");
const User = require("../models/user");
const { isLoggedIn } = require("../middleware");

router.post("/saveDate",
    wrapAsync(async (req, res, next) => {
        const { date, dateStr } = req.body;
        if (!date) {
            return res.status(400).json({ error: "Date is required" });
        }
        req.session.bookDateInfo = { date, dateStr };
        return res.json({ success: true, message: "Date selected successfully" });
    }))

router.get("/book",
    isLoggedIn,
    wrapAsync(async (req, res) => {
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
    }))

router.get("/bookedDates", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate("bookings");
    if (!listing) {
        res.json({ error: "No such listing found" });
    }
    const bookedDates = listing.bookings.map(booking => booking.date.toLocaleDateString("en-CA"));
    res.json({ success: true, dates: bookedDates });
}))

module.exports = router;