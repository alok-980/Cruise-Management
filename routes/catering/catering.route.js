const express = require("express");
const router = express.Router();
const wrapAsync = require("../../utils/wrapAsync.js");
const { cateringSchema } = require("../../schema.js");
const ExpressError = require("../../utils/expressError.js");
const { isLoggedIn, isOwner } = require("../../middleware.js");
const cateringController = require("../../controllers/catering/catering.controller.js");

const validateCatering = (req, res, next) => {
    const {error} = cateringSchema.validate(req.body);
    
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

router.route("/")
    .get(wrapAsync(cateringController.index))
    .post(
        isLoggedIn,
        validateCatering,
        wrapAsync(cateringController.createCatering)    
    );

router.get("/new", 
    isLoggedIn,
    cateringController.renderNewFor
)

router.route("/:id")
    .get(wrapAsync(cateringController.showCateringDetails))
    .put(
        isLoggedIn,
        isOwner,
        wrapAsync(cateringController.updateCatering)
    )
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(cateringController.destroyCatering)
    );

router.get("/:id/edit", 
    isLoggedIn,
    isOwner,
    wrapAsync(cateringController.showEditForm)
)

module.exports = router;