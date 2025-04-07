const Resort = require("../../models/resort/resort.models.js");
const ExpressError = require("../../utils/expressError.js");

module.exports.Index = async (req, res) => {
    const allResort = await Resort.find({});
    res.render("resort-movies/resort/index.ejs", { allResort });
}

module.exports.renderNewForm = (req, res) => {
    res.render("resort-movies/resort/new.ejs");
}

module.exports.createNewResort = async (req, res) => {
    const newResort = new Resort(req.body.resort);
    newResort.owner = req.user._id;
    await newResort.save();
    req.flash("success", "New Resort added!");
    res.redirect("/resort-movies/resort");
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let resort = await Resort.findById(id);
    if (!resort) {
        req.flash("failure", "resort you requested for does not exist!");
        res.redirect("/resort-movies/resort");
    }
    res.render("resort-movies/resort/edit.ejs", { resort });
}

module.exports.updateResortDetails = async (req, res) => {
    console.log(req.body.resort);
    if ((!req.body.resort)) {
        throw new ExpressError(400, "send valid data for resort");
    }
    let { id } = req.params;
    await Resort.findByIdAndUpdate(id, {...req.body.resort});
    req.flash("success", "resort details are updated successfully")
    res.redirect(`/resort-movies/resort`);
}

module.exports.destroyResort = async (req, res) => {
    let { id } = req.params;
    let deletedResort = await Resort.findByIdAndDelete(id);
    console.log(deletedResort);
    req.flash("success", "resort deletd successfully");
    res.redirect("/resort-movies/resort");
}