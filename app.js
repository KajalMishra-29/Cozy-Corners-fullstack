const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const Review = require("./models/review")
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync")
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema } = require("./schema");
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const session = require("express-session");
const flash = require("connect-flash");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/CozyCorners");
}
main()
    .then(() => {
        console.log("connected to database");
    })
    .catch((err) => {
        console.log(err);
    });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        httpOnly: true
    }
}
app.use(session(sessionOptions));

app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
})

app.use("/listings", listingRouter);

app.use("/listings/:id/reviews", reviewRouter)

app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
})

app.use((err, req, res, next) => {
    let { status = 500, message = "Something went wrong" } = err;
    res.status(status).render("error.ejs", { message })
})

app.listen(port, () => {
    console.log(`server is listening to port ${port}`);
});
