const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/CozyCorners");
}
main()
    .then(() => { console.log("connected to db") })
    .catch((err => console.log(err)))

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "67ac50140c33d8be5a56acfb" }));
    await Listing.insertMany(initData.data);
    console.log("data initialized successfully");
}
initDB();