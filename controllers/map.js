const Listing = require("../models/listing")

module.exports.renderSetMapLocation = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
    res.render("listings/setMap.ejs", { listing });
}
module.exports.saveLocation = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    listing.coordinates = req.body.coordinates;
    await listing.save();
    res.redirect(`/listings/${id}`);
}