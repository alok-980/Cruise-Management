const express = require("express");
const router = express.Router({mergeParams: true});
const Stationery = require("../../models/stationery/stationeryList.models");
const Item = require("../../models/stationery/stationeryItem.models.js");
const wrapAsync = require("../../utils/wrapAsync.js");
const ExpressError = require("../../utils/expressError.js");
const { isLoggedIn } = require("../../middleware.js");

router.post("/", 
    isLoggedIn,
    wrapAsync(async (req, res) => {
        let stationery = await Stationery.findById(req.params.id);
    
        if(!stationery) {
            throw new ExpressError(404, "Stationery not found");
        }
    
        if(!req.body.item) {
            throw new ExpressError(404, "Send valid data for item");
        }
    
        const newItem = new Item(req.body.item);
        stationery.item.push(newItem);
        await newItem.save();
        await stationery.save();
        req.flash("success", "New Item added successfully!");
        res.redirect(`/stationery/${stationery.id}`);
    })
)

router.delete("/:itemId", 
    isLoggedIn,
    wrapAsync(async (req, res) => {
        let { id, itemId } = req.params;
    
        await Stationery.findByIdAndUpdate(id, {$pull: {item: itemId}});
        await Item.findByIdAndDelete(itemId);
    
        req.flash("success", "Item deleted successfully");
        res.redirect(`/stationery/${id}`);
    })
)

module.exports = router;

