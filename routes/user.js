const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
})
router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) {
                next();
            }
            req.flash("success", "Registration successful!  Welcome to CozyCorners.");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}))

router.get("/login", (req, res) => {
    res.render("users/login.ejs")
})
router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    async (req, res) => {
        req.flash("success", `Login successful!  Welcome back ${req.user.username}`);
        if (res.locals.redirectUrl) {
            let trimUrl = res.locals.redirectUrl.split("/").slice(0, 3).join("/");
            return res.redirect(trimUrl);
        }
        res.redirect("/listings");
    }
)

router.get("/logout", wrapAsync(async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "you are successfully logged out !");
        res.redirect("/listings");
    })
}))
module.exports = router;