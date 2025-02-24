const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        address: Joi.string().required(),
        image: Joi.object({
            url: Joi.string().allow("", null),
            filename: Joi.string().default("")
        }),
        category: Joi.string().required().allow("room", "iconic city", "mountain", "amazing pool", "camping", "farm house", "tree house", "beach", "arctic", "dome", "boat", "cottage", "national park, others")
    }).required()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).default(3).required(),
        comment: Joi.string().min(1).max(180).required()
    }).required()
})

module.exports.userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    bookings: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)), // MongoDB objectId validation
})