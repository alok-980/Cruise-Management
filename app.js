if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");

async function main() {
    await mongoose.connect(`${process.env.MONGO_URI}/cruise-management`);
}

main().then(() => {
    console.log("connection successfull");
}).catch((err) => {
    console.log(err);
})

app.get("/", (req, res) => {
    res.send("this is the home page");
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})
