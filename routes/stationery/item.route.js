const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../../utils/wrapAsync.js");
const { isLoggedIn, isItemAuthor } = require("../../middleware.js");
const itemController = require("../../controllers/stationery/item.controller.js");

router.post("/", 
    isLoggedIn,
    wrapAsync(itemController.cerateItem)
)

router.delete("/:itemId", 
    isLoggedIn,
    isItemAuthor,
    wrapAsync(itemController.destroyItem)
)

module.exports = router;

