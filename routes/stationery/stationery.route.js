const express = require("express");
const router = express.Router();
const wrapAsync = require("../../utils/wrapAsync.js");
const { isLoggedIn, isStationeryOwner } = require("../../middleware.js");
const stationeryController = require("../../controllers/stationery/stationery.controller.js");

router.route("/")
    .get(wrapAsync(stationeryController.Index))
    .post(
        isLoggedIn,
        wrapAsync(stationeryController.createNewStationery)
    )

router.get("/new",
    isLoggedIn,
    stationeryController.renderNewForm
)

router.route("/:id")
    .get(wrapAsync(stationeryController.showStationeryDetails))
    .delete(
        isLoggedIn,
        isStationeryOwner,
        wrapAsync(stationeryController.destroyStationery)
    )

module.exports = router;