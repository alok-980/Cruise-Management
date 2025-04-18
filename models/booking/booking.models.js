const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cateringItemBookingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    bookingId: {
        type: Schema.Types.ObjectId,
        ref: "Menu",
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    }
})

const stationeryItemBookingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    bookingId: {
        type: Schema.Types.ObjectId,
        ref: "Item",
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    }
})

const resortBookingSchema = new Schema({
    userId: {
        type: String,
        required: true
    },

    bookingId: {
        type: String,
        required: true
    }
})

const moviesTicketBookingSchema = new Schema({
    userId: {
        type: String,
        required: true
    },

    bookingId: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    }
})

const CateringBooking = mongoose.model("CateringBooking", cateringItemBookingSchema);
const StationeryBooking = mongoose.model("StationeryBooking", stationeryItemBookingSchema);
const ResortBooking = mongoose.model("ResortBooking", resortBookingSchema);
const MovieTicketBooking = mongoose.model("MovieTicketBooking", moviesTicketBookingSchema);

module.exports = {
    CateringBooking,
    StationeryBooking,
    ResortBooking,
    MovieTicketBooking
}