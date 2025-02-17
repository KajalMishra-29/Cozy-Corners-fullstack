const express = require("express")
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync")
const { isLoggedIn } = require("../middleware");
const bookingController = require("../controllers/booking");

router.post("/saveDate",
    wrapAsync(bookingController.saveData)
);

router.get("/book",
    isLoggedIn,
    wrapAsync(bookingController.book)
);

router.get("/bookedDates",
    wrapAsync(bookingController.bookedDates)
);

// change status of booking
router.get("/bookingStatus",
    wrapAsync(bookingController.bookingStatus)
)

module.exports = router;