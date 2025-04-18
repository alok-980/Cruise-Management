const Catering = require("../../models/catering/cateringListing.models");
const ExpressError = require("../../utils/expressError");

module.exports.index = async (req, res) => {
    const allCaterings = await Catering.find({});
    res.render("catering/index.ejs", { allCaterings });
}

module.exports.renderNewFor = (req, res) => {
    res.render("catering/new.ejs");
}

module.exports.showCateringDetails = async (req, res) => {
    const { id } = req.params;
    let catering = await Catering.findById(id).populate("menu").populate("owner");
    if (!catering) {
        req.flash("failure", "catering you requested for does not exist!");
        return res.redirect("/catering");
    }
    res.render("catering/show.ejs", { catering });
}

module.exports.createCatering = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newCatering = new Catering(req.body.catering);
    newCatering.image = { url, filename };
    newCatering.owner = req.user._id;
    await newCatering.save();
    req.flash("success", "New catering created!");
    res.redirect("/catering");
}

module.exports.showEditForm = async (req, res) => {
    let { id } = req.params;
    let catering = await Catering.findById(id);
    if (!catering) {
        req.flash("failure", "catering you requested for does not exist!");
        res.redirect("/catering");
    }
    res.render("catering/edit.ejs", { catering });
}

module.exports.updateCatering = async (req, res) => {
    if (!req.body.catering) {
        throw new ExpressError(400, "Send valid data for catering");
    }
    let { id } = req.params;
    await Catering.findByIdAndUpdate(id, { ...req.body.catering });
    req.flash("success", "catering updated");
    res.redirect(`/catering/${id}`);
}

module.exports.destroyCatering = async (req, res) => {
    let { id } = req.params;
    let deleteCatering = await Catering.findByIdAndDelete(id);
    req.flash("success", "catering deleted successfully");
    console.log(deleteCatering);
    res.redirect("/catering");
}