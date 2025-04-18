const express = require("express");
const router = express.Router({mergeParams: true});
const bookingController = require("../../controllers/booking/booking.controller.js");

router.route("/cateringItem")
    .post(bookingController.addCateringBooking)

router.route("/stationeryItem")
    .post(bookingController.addStationeryBooking)

module.exports = router;