const express = require("express");
const router = express.Router({mergeParams: true});

const moviesController = require("../../controllers/movies/movies.controller");

router.route("/new")
    .get(moviesController.renderNewForm);

router.route("/")
    .post(moviesController.createNewMovie);

router.route("/:movieId")
    .delete(moviesController.destroyMovies);
    
module.exports = router;