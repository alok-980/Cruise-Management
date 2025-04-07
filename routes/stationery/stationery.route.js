const express = require("express");
const router = express.Router();
const Stationery = require("../../models/stationery/stationeryList.models");
const wrapAsync = require("../../utils/wrapAsync.js");
const { isLoggedIn, isStationeryOwner } = require("../../middleware.js");

router.get("/", 
    wrapAsync(async (req, res) => {
        const allStationery = await Stationery.find({});
        res.render("stationery/index.ejs", {allStationery});
    })
)

router.get("/new",
    isLoggedIn,
    (req, res) => {
    res.render("stationery/new.ejs");
})

router.get("/:id", 
    wrapAsync(async (req, res) => {
        const { id } = req.params;
        let stationery = await Stationery.findById(id).populate("item").populate("owner");
        if(!stationery) {
            req.flash("failure", "stationery you requested for does not exist!");
            res.redirect("/stationery");
        }
        res.render("stationery/show.ejs", {stationery});
    })
)

router.post("/", 
    isLoggedIn,
    wrapAsync(async (req, res) => {
        const newStationery = new Stationery(req.body.stationery);
        await newStationery.save();
        req.flash("success", "New stationery created!");
        res.redirect("/stationery");
    })
)

router.delete("/:id", 
    isLoggedIn,
    isStationeryOwner,
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let deletedStationeryList = await Stationery.findByIdAndDelete(id);
        req.flash("success", "stationery deleted successfully");
        console.log(deletedStationeryList);
        res.redirect("/stationery");
    })
)

module.exports = router;