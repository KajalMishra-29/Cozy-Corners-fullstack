const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
})
// passoprt-local-mongoose automatically saves 
// uername , hash password and salt in user object

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
