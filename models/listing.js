const mongoose = require("mongoose");
const Review = require("./review");
const { cloudinary } = require("../cloudConfig");
const { array, required } = require("joi");
const Booking = require("./booking");

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
    geometry: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number]
        }
    },
    category: {
        type: String,
        enum: ["others", "room", "iconic city", "mountain", "amazing pool", "camping", "farm house", "tree house", "beach", "arctic", "dome", "boat", "cottage", "national park"],
        required: true
    },
    averageRating: { type: Number, default: 0 }
})
// Creating a text indexes for better search performance
listingSchema.index(
    {
        title: 'text',
        description: 'text',
        city: 'text',
        state: 'text',
        country: 'text'
    },
    {
        weights: {
            title: 10,
            description: 7,
            city: 5,
            state: 3,
            country: 2
        }
    }
)

// Middleware to delete associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
    // delete reviews for that listing
    if (listing && listing.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
    // delete image in cloudinary
    if (listing && listing.image.filename) {
        await cloudinary.uploader.destroy(listing.image.filename);
    }
    // delete bookings
    if (listing && listing.bookings.length > 0) {
        await Booking.deleteMany({ _id: { $in: listing.bookings } });
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;