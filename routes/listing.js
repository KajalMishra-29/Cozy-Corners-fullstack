const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { validateListing, isLoggedIn, isOwner } = require("../middleware");
const listingController = require("../controllers/listing");

// index
router.get("/",
    wrapAsync(listingController.index)
);

// new form
router.get("/new",
    isLoggedIn,
    listingController.renderNewForm
);

// show
router.get("/:id",
    wrapAsync(listingController.showListing)
);

// create new listing
router.post("/",
    validateListing,
    wrapAsync(listingController.createListing)
);

// update form
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.updateForm)
);

// edit listing
router.patch("/:id",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
);

// delete
router.delete("/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing)
)

module.exports = router;