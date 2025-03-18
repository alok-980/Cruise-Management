const mongoose = require("mongoose");
const initData = require("./data.js");
const Catering = require("../models/cateringListing.models.js");

main().then(() => {
    console.log("connection successfull");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/cruise-management");
}

const initDB = async () => {
    await Catering.deleteMany({});
    await Catering.insertMany(initData.data);
    console.log("data saved successfully");
}

initDB();