const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { validateListing, isLoggedIn, isOwner } = require("../middleware");
const listingController = require("../controllers/listing");

const { storage } = require("../cloudConfig");
const multer = require('multer');
const upload = multer({ storage });

// index route
// create new listing
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.createListing)
    )

// new form
router.get("/new",
    isLoggedIn,
    listingController.renderNewForm
);

// show
// edit listing
// delete
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .patch(isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(isLoggedIn,
        isOwner,
        wrapAsync(listingController.deleteListing)
    )

// update form
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.updateForm)
);
module.exports = router;