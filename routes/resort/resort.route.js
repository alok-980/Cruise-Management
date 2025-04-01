const express = require("express");
const router = express.Router();
const Resort = require("../../models/resort/resort.models.js");
const wrapAsync = require("../../utils/wrapAsync.js");
const ExpressError = require("../../utils/expressError.js");
const { isLoggedIn } = require("../../middleware.js");

router.get("/", 
    wrapAsync(async (req, res) => {
        const allResort = await Resort.find({});
        res.render("resort-movies/resort/index.ejs", {allResort});
    })
)

router.get("/new", 
    isLoggedIn,
    (req, res) => {
    res.render("resort-movies/resort/new.ejs");
})

router.post("/", 
    isLoggedIn,
    wrapAsync(async (req, res) => {
        const newResort = new Resort(req.body.resort);
        await newResort.save();
        req.flash("success", "New Resort added!");
        res.redirect("/resort-movies/resort");
    })
)

router.get("/:id/edit", 
    isLoggedIn,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let resort = await Resort.findById(id);
        if(!resort) {
            req.flash("failure", "resort you requested for does not exist!");
            res.redirect("/resort-movies/resort");
        }
        res.render("resort-movies/resort/edit.ejs", {resort});
    })
)

router.put("/:id", 
    isLoggedIn,
    wrapAsync(async (req, res) => {
        console.log(req.body.resort);
        if ((!req.body.resort)) {
            throw new ExpressError(400, "send valid data for resort");
        }
        let { id } = req.params;
        await Resort.findByIdAndUpdate(id, {...req.body.resort});
        req.flash("success", "resort details are updated successfully")
        res.redirect(`/resort-movies/resort`);
    })
)

router.delete("/:id", 
    isLoggedIn,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let deletedResort = await Resort.findByIdAndDelete(id);
        console.log(deletedResort);
        req.flash("success", "resort deletd successfully");
        res.redirect("/resort-movies/resort");
    })
)

module.exports = router;
