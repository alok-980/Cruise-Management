const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cateringSchema = new Schema({
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

    location: {
        type: String,
        required: true
    },
})

const Catering = mongoose.model("Catering", cateringSchema);

module.exports = Catering;