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

// catering index route
router.get("/", 
    wrapAsync(cateringController.index)
)

// catering new route
router.get("/new", 
    isLoggedIn,
    cateringController.renderNewFor
)

// catering show route
router.get("/:id", 
    wrapAsync(cateringController.showCateringDetails)
)

// catering post route
router.post("/",
    isLoggedIn,
    validateCatering,
    wrapAsync(cateringController.createCatering)    
)

// catering edit route
router.get("/:id/edit", 
    isLoggedIn,
    isOwner,
    wrapAsync(cateringController.showEditForm)
)

// catering update route
router.put("/:id", 
    isLoggedIn,
    isOwner,
    wrapAsync(cateringController.updateCatering)
)

// catering delete route
router.delete("/:id", 
    isLoggedIn,
    isOwner,
    wrapAsync(cateringController.destroyCatering)
)

module.exports = router;