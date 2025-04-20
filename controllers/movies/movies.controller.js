const Movies = require("../../models/movies/movies.models");
const MoviesHall = require("../../models/movies/moviesHall.models");
const ExpressError = require("../../utils/expressError");

module.exports.renderNewForm = async (req, res) => {
    const { id } = req.params;
    res.render("resort-movies/movies-hall/movies/new.ejs", { id });
}

module.exports.createNewMovie = async (req, res) => {
    const { id } = req.params;

    let moviesHall = await MoviesHall.findById(id);

    if(!moviesHall) {
        throw new ExpressError(404, "moviesHall not found");
    }

    if(!req.body.movies) {
        throw new ExpressError(404, "Send valid data for movies");
    }

    const newMovies = new Movies(req.body.movies);

    newMovies.author = req.user._id;
    console.log(newMovies);

    moviesHall.movies.push(newMovies);

    await newMovies.save();
    await moviesHall.save();
    req.flash("success", "New movie added successfully");
    res.redirect(`/resort-movies/movies/${id}`);
}

module.exports.destroyMovies = async (req, res) => {
    const { id, movieId } = req.params;

    const deletedMovie = await Movies.findByIdAndDelete(movieId);

    console.log(deletedMovie);

    req.flash("success", "movie is deleted");

    res.redirect(`/resort-movies/movies/${id}`)
}