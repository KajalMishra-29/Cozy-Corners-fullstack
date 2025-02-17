const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { validateUser, saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user");

router.get("/signup",
    userController.renderSignupForm
);

router.post("/signup",
    validateUser,
    wrapAsync(userController.signup)
);

router.get("/login",
    userController.renderLoginForm
);

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    wrapAsync(userController.login)
)

router.get("/logout",
    wrapAsync(userController.logout)
)

module.exports = router;