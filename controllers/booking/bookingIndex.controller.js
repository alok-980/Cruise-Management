const { CateringBooking, StationeryBooking } = require("../../models/booking/booking.models");

module.exports.renderCateringBookedItem = async (req, res) => {
    const bookedItems = await CateringBooking.find({})
        .populate("userId")
        .populate("bookingId");

    res.render("booking/booking.ejs", { bookedItems });
}

module.exports.renderStationeryBoockedItem = async (req, res) => {
    const boockedItem = await StationeryBooking.find({})
        .populate("userId")
        .populate("bookingId");

    res.render("booking/stationeryBooking.ejs", {boockedItem});
}