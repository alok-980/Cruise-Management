const express = require("express");
const router = express.Router();
const MoviesHall = require("../../models/movies/moviesHall.models.js");
const wrapAsync = require("../../utils/wrapAsync.js");
const ExpressError = require("../../utils/expressError.js");
const { isLoggedIn } = require("../../middleware.js");

router.get("/", 
    wrapAsync(async (req, res) => {
        const allMoviesHall = await MoviesHall.find({});
        res.render("resort-movies/movies-hall/index.ejs", {allMoviesHall});
    })
)

router.get("/new",
    isLoggedIn,
    (req, res) => {
    res.render("resort-movies/movies-hall/new.ejs");
})

router.get("/:id", 
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        const moviesHall = await MoviesHall.findById(id);
        res.render("resort-movies/movies-hall/show.ejs", {moviesHall});
    })
)

router.post("/", 
    isLoggedIn,
    wrapAsync(async (req, res) => {
        const newHall = new MoviesHall(req.body.hall);
        await newHall.save();
        res.redirect("/resort-movies/movies");
    })
)

router.get("/:id/edit", 
    isLoggedIn,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let hall = await MoviesHall.findById(id);
        if(!hall) {
            req.flash("failure", "hall you requested for does not exist!");
            res.redirect("/resort-movies/movies");
        }
        res.render("resort-movies/movies-hall/edit.ejs", {hall});
    })
)

router.put("/:id", 
    isLoggedIn,
    wrapAsync(async (req, res) => {
        if(!req.body.hall) {
            throw new ExpressError(400, "send valid data for movies hall");
        }
        let { id } = req.params;
        await MoviesHall.findByIdAndUpdate(id, {...req.body.hall});
        req.flash("success", "hall details are updated");
        res.redirect(`/resort-movies/movies`);
    })
)

router.delete("/:id", 
    isLoggedIn,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let deletedHall = await MoviesHall.findByIdAndDelete(id);
        console.log(deletedHall);
        req.flash("success", "Movie hall deleted successfully");
        res.redirect("/resort-movies/movies");
    })
)

module.exports = router;