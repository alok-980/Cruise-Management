const mongoose = require("mongoose");
const initData = require("./data.js");
const Catering = require("../models/catering/cateringListing.models.js");
const Stationery = require("../models/stationery/stationeryList.models.js");
const Resort = require("../models/resort/resort.models.js");
const MoviesHall = require("../models/movies/moviesHall.models.js");

main().then(() => {
    console.log("connection successfull");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/cruise-management");
}

const initDB = async () => {
    // await Catering.deleteMany({});
    // initData.data = initData.data.map((obj) => ({...obj, owner: "67eb972693642221187bbefa"}))
    // await Catering.insertMany(initData.data);

    // await Stationery.deleteMany({});
    // initData.list = initData.list.map((obj) => ({...obj, owner: "67eb972693642221187bbefa"}))
    // await Stationery.insertMany(initData.list);

    // await Resort.deleteMany({});
    // initData.resort = initData.resort.map((obj) => ({...obj, owner: "67eb972693642221187bbefa"}))
    // await Resort.insertMany(initData.resort);

    await MoviesHall.deleteMany({});
    initData.moviesHall = initData.moviesHall.map((obj) => ({...obj, owner: "67eb972693642221187bbefa"}))
    await MoviesHall.insertMany(initData.moviesHall);
    console.log("data saved successfully");
}

initDB();