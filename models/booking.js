const { ref } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing"
    }
})

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;