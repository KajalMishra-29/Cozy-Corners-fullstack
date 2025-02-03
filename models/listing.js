const mongoose = require("mongoose");
const { type } = require("os");

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
        type: String,
        set: (v) => v === "" ? "https://i.pinimg.com/736x/2f/f3/3b/2ff33b593016e5407cc26848ce6a3c35.jpg" : v
    },
    price: Number,
    location: String,
    country: String
})
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;