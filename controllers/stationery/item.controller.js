const Stationery = require("../../models/stationery/stationeryList.models");
const Item = require("../../models/stationery/stationeryItem.models.js");
const ExpressError = require("../../utils/expressError.js");

module.exports.cerateItem = async (req, res) => {
    let stationery = await Stationery.findById(req.params.id);

    if(!stationery) {
        throw new ExpressError(404, "Stationery not found");
    }

    if(!req.body.item) {
        throw new ExpressError(404, "Send valid data for item");
    }

    const newItem = new Item(req.body.item);
    newItem.author = req.user._id;
    console.log(newItem);
    stationery.item.push(newItem);

    await newItem.save();
    await stationery.save();
    req.flash("success", "New Item added successfully!");
    res.redirect(`/stationery/${stationery.id}`);
}

module.exports.destroyItem = async (req, res) => {
    let { id, itemId } = req.params;

    await Stationery.findByIdAndUpdate(id, {$pull: {item: itemId}});
    await Item.findByIdAndDelete(itemId);

    req.flash("success", "Item deleted successfully");
    res.redirect(`/stationery/${id}`);
}