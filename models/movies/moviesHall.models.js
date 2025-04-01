const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Movies = require("./movies.models.js");

const moviesHallSchema = new Schema({
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

    capacity: {
        type: Number,
        required: true
    },

    movies: [
        {
            type: Schema.Types.ObjectId,
            ref: "Movies"
        }
    ]
})

moviesHallSchema.post("findOneAndDelete", async (movieshall) => {
    if(movieshall) {
        await Movies.deleteMany({_id : {$in: movieshall.movies}});
    }
})

const MoviesHall = mongoose.model("MoviesHall", moviesHallSchema);
module.exports = MoviesHall;