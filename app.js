if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");
const bookingRouter = require("./routes/booking");
const mapRouter = require("./routes/map");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const LocalStrategy = require("passport-local");
const passport = require("passport");
const User = require("./models/user");
const scheduleBookingCleanup = require("./utils/bookingCleanup");

// const mongoDB_url = "mongodb://127.0.0.1:27017/CozyCorners";
const altasDB_url = process.env.ATLASDB_URL;

async function main() {
    await mongoose.connect(altasDB_url);
}
main()
    .then(() => {
        console.log("connected to database");
    })
    .catch((err) => {
        console.log(err);
    });

scheduleBookingCleanup();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const store = MongoStore.create({
    mongoUrl: altasDB_url,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 60 * 60
})
store.on("error", (err) => {
    console.log("error in MONGO SESSION STORE", err)
})
const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
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

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter)
app.use("/", userRouter);
app.use("/listings/:id/bookings", bookingRouter);
app.use("/listings/:id/maps", mapRouter);

// home page
app.get("/", (req, res) => {
    res.render("home.ejs")
})
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
