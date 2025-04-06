const Catering = require("./models/catering/cateringListing.models");
const MoviesHall = require("./models/movies/moviesHall.models");
const Resort = require("./models/resort/resort.models");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("failure", "You must be login to make changes");
        return res.redirect("/admin/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let catering = await Catering.findById(id);
    if (!catering.owner._id.equals(currUser._id)) {
        req.flash("failure", "you are not the owner of this catering");
        return res.redirect(`/catering/${id}`);
    }
    next();
}

module.exports.isHallOwner = async (req, res, next) => {
    let { id } = req.params;
    let hall = await MoviesHall.findById(id);
    if(!hall.owner._id.equals(currUser._id)) {
        req.flash("failure", "you are not the owner of this movies hall");
        return res.redirect(`/resort-movies/movies`);
    }
    next();
}

module.exports.isResortOwner = async (req, res, next) => {
    let { id } = req.params;
    let resort = await Resort.findById(id);
    if(!resort.owner._id.equals(currUser._id)) {
        req.flash("failure", "you are not the user of this resort");
        res.redirect(`/resort-movies/resort`);
    }
    next();
}