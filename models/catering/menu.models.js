const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema(
    {
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

        price: {
            type: Number,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now()
        },

        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }
)

module.exports = mongoose.model("Menu", menuSchema);