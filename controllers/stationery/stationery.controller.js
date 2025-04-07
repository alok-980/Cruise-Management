const Stationery = require("../../models/stationery/stationeryList.models");

module.exports.Index = async (req, res) => {
    const allStationery = await Stationery.find({});
    res.render("stationery/index.ejs", { allStationery });
}

module.exports.renderNewForm = (req, res) => {
    res.render("stationery/new.ejs");
}

module.exports.showStationeryDetails = async (req, res) => {
    const { id } = req.params;
    let stationery = await Stationery.findById(id).populate("item").populate("owner");
    if (!stationery) {
        req.flash("failure", "stationery you requested for does not exist!");
        res.redirect("/stationery");
    }
    res.render("stationery/show.ejs", { stationery });
}

module.exports.createNewStationery = async (req, res) => {
    const newStationery = new Stationery(req.body.stationery);
    newStationery.owner = req.user._id;
    await newStationery.save();
    req.flash("success", "New stationery created!");
    res.redirect("/stationery");
}

module.exports.destroyStationery = async (req, res) => {
    let { id } = req.params;
    let deletedStationeryList = await Stationery.findByIdAndDelete(id);
    req.flash("success", "stationery deleted successfully");
    console.log(deletedStationeryList);
    res.redirect("/stationery");
}