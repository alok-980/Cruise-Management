const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Item = require("./stationeryItem.models.js");

const stationaryListSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg",
        set: (v) => v === "" ? "https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg" : v
    },

    item: [
        {
          type: Schema.Types.ObjectId,
          ref: "Item"
        }
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

stationaryListSchema.post("findOneAndDelete", async (stationery) => {
    if(stationery) {
        await Item.deleteMany({_id : {$in: stationery.item}});
    }
})

const Stationery = mongoose.model("Stationery", stationaryListSchema);
module.exports = Stationery;