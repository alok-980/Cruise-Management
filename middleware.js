const Catering = require("./models/catering/cateringListing.models");
const Menu = require("./models/catering/menu.models");
const MoviesHall = require("./models/movies/moviesHall.models");
const Resort = require("./models/resort/resort.models");
const Item = require("./models/stationery/stationeryItem.models");
const Stationery = require("./models/stationery/stationeryList.models");

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

module.exports.isStationeryOwner = async (req, res, next) => {
    let { id } = req.params;
    let stationery = await Stationery.findById(id);
    if(!stationery.owner._id.equals(currUser._id)) {
        req.flash("failure", "you are not the owner of this stationer");
        res.redirect("/stationery");
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

module.exports.isMenuAuthor = async (req, res, next) => {
    let { id, menuId } = req.params;
    let menu = await Menu.findById(menuId); 
    if(!menu.author._id.equals(req.user._id)) {
        req.flash("failure", "you are not the author of this menu");
        res.redirect(`/catering/${id}`);
    }
    next();
}

module.exports.isItemAuthor = async (req, res, next) => {
    let { id, itemId} = req.params;
    let item = Item.findById(itemId);
    if(!item.author._id.equals(req.user._id)) {
        req.flash("failure", "you are not the author of items");
        res.redirect(`/stationery/${id}`);
    }
    next();
}