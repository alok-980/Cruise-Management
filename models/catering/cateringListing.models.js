const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Menu = require("./menu.models.js");

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
        url: String,
        filename: String
    },

    location: {
        type: String,
        required: true
    },

    menu: [
        {
          type: Schema.Types.ObjectId,
          ref: "Menu"
        }
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

cateringSchema.post("findOneAndDelete", async (catering) => {
    if(catering) {
        await Menu.deleteMany({_id : {$in: catering.menu}});
    }
})

const Catering = mongoose.model("Catering", cateringSchema);

module.exports = Catering;