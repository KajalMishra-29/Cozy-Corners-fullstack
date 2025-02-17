const mongoose = require("mongoose");
const cron = require("node-cron");
const Booking = require("../models/booking")
const Listing = require("../models/listing")
const User = require("../models/user")

const scheduleBookingCleanup = () => {
    cron.schedule('0 0 * * * ', async () => {
        try {
            const sixMonthAgo = new Date();
            sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
            // find old bookings
            const oldBookings = await Booking.find({ date: { $lt: sixMonthAgo } });
            if (oldBookings.length > 0) {
                for (const booking of oldBookings) {
                    // remove booking ID from listing
                    await Listing.updateOne({ _id: booking.listing }, { $pull: { bookings: booking._id } });
                    // remove booking ID from User
                    await User.updateOne({ _id: booking.user }, { $pull: { bookings: booking._id } });
                }
                // Move to archive collection
                await mongoose.connection.collection("ArchivedBookings").insertMany(oldBookings);
                // Delete from main collection
                const result = await Booking.deleteMany({ date: { $lt: sixMonthAgo } });
                console.log(`deleted ${result.deletedCount} old bookings`)
            }
        } catch (err) {
            console.error("Error deleting old bookings : ", err);
        }
    });
    console.log("Cron job scheduled to delete old bookings every midnight.");
}

module.exports = scheduleBookingCleanup;