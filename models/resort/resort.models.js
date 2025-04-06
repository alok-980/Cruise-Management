const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resortSchema = new Schema({
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

    owner: {
        type: Schema.Types.ObjectId,
        ref: "Admin"
    }
})

const Resort = mongoose.model("Resort", resortSchema);
module.exports = Resort;