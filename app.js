if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Catering = require("./models/cateringListing.models");

const MONGO_URL = `${process.env.MONGO_URI}cruise-management`;

async function main() {
    await mongoose.connect(MONGO_URL);
}

main().then(() => {
    console.log("connection successfull");
}).catch((err) => {
    console.log(err);
})

app.get("/", (req, res) => {
    res.send("this is the home page");
})

app.get("/testListing", async (req, res) => {
    let sampleCatering = new Catering({
        title: "Sona Catering Services",
        description: "This the best catering services",
        location: "1st floore 2A"
    })

    await sampleCatering.save();
    console.log("listing is saved successfully");
    res.send("listing saved successfully");
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
