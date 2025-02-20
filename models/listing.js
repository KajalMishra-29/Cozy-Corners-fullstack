const mongoose = require("mongoose");
const Review = require("./review");
const { cloudinary } = require("../cloudConfig");

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url: {
            type: String,
            default: "https://i.pinimg.com/736x/2f/f3/3b/2ff33b593016e5407cc26848ce6a3c35.jpg",

        }, filename: String
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
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
    }
})

// Middleware to delete associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
    if (listing && listing.image.filename) {
        await cloudinary.uploader.destroy(listing.image.filename);
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;