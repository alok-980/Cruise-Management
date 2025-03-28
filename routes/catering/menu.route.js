const express = require("express");
const router = express.Router({mergeParams: true});
const Catering = require("../../models/catering/cateringListing.models.js");
const Menu = require("../../models/catering/menu.models.js");
const wrapAsync = require("../../utils/wrapAsync.js");
const { menuSchema } = require("../../schema.js");
const ExpressError = require("../../utils/expressError.js");

const validateMenu = (req, res, next) => {
    const {error} = menuSchema.validate(req.body);
    
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}


// route to add menu item for perticular catering
router.post("/",
    // validateMenu,
    wrapAsync(async (req, res) => {
        let catering = await Catering.findById(req.params.id);

        if (!catering) {
            throw new ExpressError(404, "Catering not found");
        }

        if(!req.body.menu) {
            throw new ExpressError(400, "Send valid data for menu");
        }
    
        const newMenu = new Menu(req.body.menu);
    
        catering.menu.push(newMenu);
    
        await newMenu.save();
        await catering.save();
        req.flash("success", "New menu added successfully!");
        res.redirect(`/catering/${catering.id}`);
    })
)

//route to delete menu items for perticular catering
router.delete("/:menuId", 
    wrapAsync(async (req, res) => {
        let { id, menuId } = req.params;
    
        await Catering.findByIdAndUpdate(id, {$pull: {menu: menuId}});
        await Menu.findByIdAndDelete(menuId);

        req.flash("success", "Menu deleted successfully!");
    
        res.redirect(`/catering/${id}`);
    })
)

module.exports = router;