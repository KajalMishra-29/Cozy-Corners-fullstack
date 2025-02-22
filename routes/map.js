const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync")
const { isLoggedIn, isOwner } = require("../middleware");
const mapController = require("../controllers/map");

router.get("/setMapCoordinates",
    isLoggedIn,
    isOwner,
    wrapAsync(mapController.renderSetMapLocation)
)
router.post("/saveLocation",
    isLoggedIn,
    isOwner,
    wrapAsync(mapController.saveLocation));

module.exports = router;
