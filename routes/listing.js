const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { validateListing, isLoggedIn, isOwner } = require("../middleware");
const listingController = require("../controllers/listing");

const multer = require('multer');
const upload = multer({ dest: '/uploads' });

router
    .route("/")
    .get(wrapAsync(listingController.index)) // index route
    .post(validateListing,                   // create new listing
        wrapAsync(listingController.createListing)
    )

// new form
router.get("/new",
    isLoggedIn,
    listingController.renderNewForm
);

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing)) // show
    .patch(isLoggedIn,                      // edit listing
        isOwner,
        validateListing,
        wrapAsync(listingController.updateListing)
    )
    .delete(isLoggedIn,                     // delete
        isOwner,
        wrapAsync(listingController.deleteListing)
    )

// update form
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.updateForm)
);

router
module.exports = router;