const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg",
        set: (v) => v === "" ? "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg" : v
    },

    price: {
        type: Number,
        required: true
    },

    schedule: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Movies", moviesSchema);