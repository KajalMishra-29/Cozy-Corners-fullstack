const { required } = require("joi");
const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    comment: {
        type: String,
        maxlength: 180,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;