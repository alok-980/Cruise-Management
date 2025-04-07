const express = require("express");
const router = express.Router();
const wrapAsync = require("../../utils/wrapAsync.js");
const { isLoggedIn, isResortOwner } = require("../../middleware.js");
const resortControllers = require("../../controllers/resort/resort.controller.js");

router.route("/")
    .get(wrapAsync(resortControllers.Index))
    .post(
        isLoggedIn,
        wrapAsync(resortControllers.createNewResort)
    );

router.get("/new", 
    isLoggedIn,
    resortControllers.renderNewForm
)

router.get("/:id/edit", 
    isLoggedIn,
    isResortOwner,
    wrapAsync(resortControllers.renderEditForm)
)

router.route("/:id")
    .put(
        isLoggedIn,
        isResortOwner,
        wrapAsync(resortControllers.updateResortDetails)
    )
    .delete( 
        isLoggedIn,
        isResortOwner,
        wrapAsync(resortControllers.destroyResort)
    );

module.exports = router;
