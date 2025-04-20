const MoviesHall = require("../../models/movies/moviesHall.models.js");
const ExpressError = require("../../utils/expressError.js");

module.exports.Index = async (req, res) => {
    const allMoviesHall = await MoviesHall.find({});
    res.render("resort-movies/movies-hall/index.ejs", { allMoviesHall });
}

module.exports.renderNewForm = (req, res) => {
    res.render("resort-movies/movies-hall/new.ejs");
}

module.exports.showHallDetails = async (req, res) => {
    let { id } = req.params;
    const moviesHall = await MoviesHall.findById(id).populate("movies");
    res.render("resort-movies/movies-hall/show.ejs", { moviesHall });
}

module.exports.createMoviesHall = async (req, res) => {
    const newHall = new MoviesHall(req.body.hall);
    newHall.owner = req.user._id;
    await newHall.save();
    res.redirect("/resort-movies/movies");
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let hall = await MoviesHall.findById(id);
    if (!hall) {
        req.flash("failure", "hall you requested for does not exist!");
        res.redirect("/resort-movies/movies");
    }
    res.render("resort-movies/movies-hall/edit.ejs", { hall });
}

module.exports.updateHallDetails = async (req, res) => {
    if (!req.body.hall) {
        throw new ExpressError(400, "send valid data for movies hall");
    }
    let { id } = req.params;
    await MoviesHall.findByIdAndUpdate(id, { ...req.body.hall });
    req.flash("success", "hall details are updated");
    res.redirect(`/resort-movies/movies`);
}

module.exports.destroyMoviesHall = async (req, res) => {
    let { id } = req.params;
    let deletedHall = await MoviesHall.findByIdAndDelete(id);
    console.log(deletedHall);
    req.flash("success", "Movie hall deleted successfully");
    res.redirect("/resort-movies/movies");
}