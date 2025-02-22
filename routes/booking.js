const express = require("express")
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync")
const { isLoggedIn, isBookingAuthor } = require("../middleware");
const bookingController = require("../controllers/booking");

router.post("/saveDate",
    wrapAsync(bookingController.saveData)
);

router.get("/book",
    isLoggedIn,
    wrapAsync(bookingController.book)
);
router.delete("/:b_id/cancelBooking",
    isLoggedIn,
    isBookingAuthor,
    wrapAsync(bookingController.cancelBooking)
);

router.get("/bookedDates",
    wrapAsync(bookingController.bookedDates)
);

// change status of booking
router.get("/bookingStatus",
    wrapAsync(bookingController.bookingStatus)
)

module.exports = router;