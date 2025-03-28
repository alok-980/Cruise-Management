const express = require("express");
const router = express.Router();
const Catering = require("../../models/catering/cateringListing.models.js");
const wrapAsync = require("../../utils/wrapAsync.js");
const { cateringSchema } = require("../../schema.js");
const ExpressError = require("../../utils/expressError.js");

const validateCatering = (req, res, next) => {
    const {error} = cateringSchema.validate(req.body);
    
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

// catering index route
router.get("/", 
    wrapAsync(async (req, res) => {
        const allCaterings = await Catering.find({});
        res.render("catering/index.ejs", { allCaterings });
    })
)

// catering new route
router.get("/new", (req, res) => {
    res.render("catering/new.ejs");
})

// catering show route
router.get("/:id", 
    wrapAsync(async (req, res) => {
        const { id } = req.params;
        let catering = await Catering.findById(id).populate("menu");
        if(!catering) {
            req.flash("failure", "catering you requested for does not exist!");
            res.redirect("/catering");
        }
        res.render("catering/show.ejs", {catering});
    })
)

// catering post route
router.post("/",
    validateCatering,
    wrapAsync(async (req, res) => {
        const newCatering = new Catering(req.body.catering);
        await newCatering.save();
        req.flash("success", "New catering created!");
        res.redirect("/catering");
    })    
)

// catering edit route
router.get("/:id/edit", 
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let catering = await Catering.findById(id);
        if(!catering) {
            req.flash("failure", "catering you requested for does not exist!");
            res.redirect("/catering");
        }
        res.render("catering/edit.ejs", {catering});
    })
)

// catering update route
router.put("/:id", 
    wrapAsync(async (req, res) => {
        if(!req.body.catering) {
            throw new ExpressError(400, "Send valid data for catering");
        }
        let { id } = req.params;
        await Catering.findByIdAndUpdate(id, {...req.body.catering});
        req.flash("success", "catering updated");
        res.redirect(`/catering/${id}`);
    })
)

// catering delete route
router.delete("/:id", 
    wrapAsync(async (req, res) => {
        let { id } = req.params;
        let deleteCatering = await Catering.findByIdAndDelete(id);
        req.flash("success", "catering deleted successfully");
        console.log(deleteCatering);
        res.redirect("/catering");
    })
)

module.exports = router;