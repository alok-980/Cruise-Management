const express = require("express");
const router = express.Router();
const bookingIndexController = require("../../controllers/booking/bookingIndex.controller");

router.route("/headcook")
    .get(bookingIndexController.renderCateringBookedItem);

router.route("/supervisor")
    .get(bookingIndexController.renderStationeryBoockedItem);

module.exports = router;