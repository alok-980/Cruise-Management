const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../../utils/wrapAsync.js");
const { menuSchema } = require("../../schema.js");
const ExpressError = require("../../utils/expressError.js");
const { isLoggedIn, isMenuAuthor } = require("../../middleware.js");
const menuController = require("../../controllers/catering/menu.controller.js");

const multer  = require('multer')
const { storage } = require("../../cloudConfig.js");
const upload = multer({ storage })

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
    isLoggedIn,
    upload.single('menu[image]'),
    wrapAsync(menuController.createMenu)
)

//route to delete menu items for perticular catering
router.delete("/:menuId", 
    isLoggedIn,
    isMenuAuthor,
    wrapAsync(menuController.destroyMenu)
)

module.exports = router;