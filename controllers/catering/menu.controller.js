const Catering = require("../../models/catering/cateringListing.models");
const Menu = require("../../models/catering/menu.models");

module.exports.createMenu = async (req, res) => {
    let catering = await Catering.findById(req.params.id);

    if (!catering) {
        throw new ExpressError(404, "Catering not found");
    }

    if(!req.body.menu) {
        throw new ExpressError(400, "Send valid data for menu");
    }

    const newMenu = new Menu(req.body.menu);
    newMenu.author = req.user._id

    catering.menu.push(newMenu);

    await newMenu.save();
    await catering.save();
    req.flash("success", "New menu added successfully!");
    res.redirect(`/catering/${catering.id}`);
}

module.exports.destroyMenu = async (req, res) => {
    let { id, menuId } = req.params;

    await Catering.findByIdAndUpdate(id, {$pull: {menu: menuId}});
    await Menu.findByIdAndDelete(menuId);

    req.flash("success", "Menu deleted successfully!");

    res.redirect(`/catering/${id}`);
}