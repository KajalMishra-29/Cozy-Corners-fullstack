const mongoose = require("mongoose");
const Review = require("./review");
const { cloudinary } = require("../cloudConfig");
const { array } = require("joi");

const listingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        url: {
            type: String,
            default: "https://i.pinimg.com/736x/2f/f3/3b/2ff33b593016e5407cc26848ce6a3c35.jpg",

        }, filename: String
    },
    price: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        }
    ],
    bookingStatus: {
        type: String,
        enum: ['open', 'close'],
        default: 'open'
    },
    coordinates: {
        latitude: Number,
        longitude: Number
    }
})

// Middleware to delete associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing && listing.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
    if (listing && listing.image.filename) {
        await cloudinary.uploader.destroy(listing.image.filename);
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;