if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Catering = require("./models/catering/cateringListing.models");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const MONGO_URL = `${process.env.MONGO_URI}cruise-management`;

async function main() {
    await mongoose.connect(MONGO_URL);
}

main().then(() => {
    console.log("connection successfull");
}).catch((err) => {
    console.log(err);
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

app.get("/", (req, res) => {
    res.send("this is the home page");
})

// catering index route
app.get("/catering", async (req, res) => {
    const allCaterings = await Catering.find({});
    res.render("catering/index.ejs", { allCaterings });
})

// catering new route
app.get("/catering/new", (req, res) => {
    res.render("catering/new.ejs");
})

// catering show route
app.get("/catering/:id", async (req, res) => {
    const { id } = req.params;
    let catering = await Catering.findById(id);
    res.render("catering/show.ejs", {catering});
})

// catering post route
app.post("/catering", async (req, res) => {
    const newCatering = new Catering(req.body.catering);
    await newCatering.save();
    res.redirect("/catering");
})

// catering edit route
app.get("/catering/:id/edit", async (req, res) => {
    let { id } = req.params;
    let catering = await Catering.findById(id);
    res.render("catering/edit.ejs", {catering});
})

// catering update route
app.put("/catering/:id", async (req, res) => {
    let { id } = req.params;
    await Catering.findByIdAndUpdate(id, {...req.body.catering});
    res.redirect("/catering")
})

// catering delete route
app.delete("/catering/:id", async (req, res) => {
    let { id } = req.params;
    let deleteCatering = await Catering.findByIdAndDelete(id);
    console.log(deleteCatering);
    res.redirect("/catering");
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
