const { CateringBooking, StationeryBooking } = require("../../models/booking/booking.models.js");

module.exports.addCateringBooking = async (req, res) => {
    const { id } = req.params;
    
    const cateringItemBooking = new CateringBooking({
        userId: req.user._id,
        bookingId: id,
        quantity: req.body.quantity
    })

    const bookedItem = await cateringItemBooking.save();
    console.log(bookedItem);
    res.redirect("/catering");
}

module.exports.addStationeryBooking = async (req, res) => {
    const { id } = req.params;

    const stationeryItemBooking = new StationeryBooking({
        userId: req.user._id,
        bookingId: id,
        quantity: req.body.quantity
    })

    const boockedItem = await stationeryItemBooking.save();
    console.log(boockedItem);
    res.redirect("/stationery");
}