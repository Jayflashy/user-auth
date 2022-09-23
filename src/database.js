const mongoose = require("mongoose");

require('dotenv').config()

const {DB_URL} = process.env;
// const {DB} = process.env;

mongoose.connect = mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connection
    .on("open", () => console.log("Connection open"))
    .on("close", () => console.log("Connection closed"))
    .on("error", () => console.log("Connection error"))

// EXPORT CONNECTION
module.exports = mongoose