const mongoose = require("mongoose");
const initData = require("./data.js");
const Catering = require("../models/catering/cateringListing.models.js");
const Stationery = require("../models/stationery/stationeryList.models.js");
const Resort = require("../models/resort/resort.models.js");

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
    // await Catering.insertMany(initData.data);

    // await Stationery.deleteMany({});
    // await Stationery.insertMany(initData.list);

    await Resort.deleteMany({});
    await Resort.insertMany(initData.resort);
    console.log("data saved successfully");
}

initDB();