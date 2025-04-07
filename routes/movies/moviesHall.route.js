const express = require("express");
const router = express.Router();
const wrapAsync = require("../../utils/wrapAsync.js");
const { isLoggedIn, isHallOwner } = require("../../middleware.js");
const moviesHallController = require("../../controllers/movies/moviesHall.controller.js");

router.route("/")
    .get(wrapAsync(moviesHallController.Index))
    .post(
        isLoggedIn,
        wrapAsync(moviesHallController.createMoviesHall)
    );

router.get("/new",
    isLoggedIn,
    moviesHallController.renderNewForm
)

router.route("/:id")
    .get(wrapAsync(moviesHallController.showHallDetails))
    .put( 
        isLoggedIn,
        isHallOwner,
        wrapAsync(moviesHallController.updateHallDetails)
    )
    .delete( 
        isLoggedIn,
        isHallOwner,
        wrapAsync(moviesHallController.destroyMoviesHall)
    )

router.get("/:id/edit", 
    isLoggedIn,
    isHallOwner,
    wrapAsync(moviesHallController.renderEditForm)
)

module.exports = router;