const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stationeryItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    
    image: {
        type: String,
        default: "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg",
        set: (v) => v === "" ? "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg" : v
    },

    price: {
        type: String,
        required: true
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Item", stationeryItemSchema);