if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError.js");
const session = require("express-session");
const flash = require('connect-flash');

const cateringRoute = require("./routes/catering/catering.route.js");
const menuRoute = require("./routes/catering/menu.route.js");

const stationeryRoute = require("./routes/stationery/stationery.route.js");
const itemRoute = require("./routes/stationery/item.route.js");

const resortRoute = require("./routes/resort/resort.route.js")

const MONGO_URL = `${process.env.MONGO_URI}cruise-management`;

async function main() {
    await mongoose.connect(MONGO_URL);
}

main().then(() => {
    console.log("connection successfull");
}).catch((err) => {
    console.log(err);
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));

const sessionOptions = {
    secret: "supersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}

app.get("/", (req, res) => {
    console.dir(req.cookies);
    res.render("root.ejs");
})

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.failure = req.flash("failure");
    next();
})

app.use("/catering", cateringRoute);
app.use("/catering/:id/menu", menuRoute);

app.use("/stationery", stationeryRoute);
app.use("/stationery/:id/item", itemRoute);

app.get("/resort-movies", (req, res) => {
    res.render("resort-movies/index.ejs");
})

app.use("/resort-movies/resort", resortRoute);





app.get("/resort-movies/movies", (req, res) => {
    res.render("resort-movies/movies-hall/index.ejs");
})

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
})

app.use((err, req, res, next) => {
    let {statusCode=500, message="something whent wrong"} = err;
    res.status(statusCode).render("error.ejs", {message});
    // res.status(statusCode).send(message);
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
