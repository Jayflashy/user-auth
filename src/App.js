const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cors = require("cors") 
require('dotenv').config()
const {PORT = 2100, DB_URL} = process.env
const authRoute = require('./routes/authRoute.js')
const adminRoute = require('./routes/adminRoute.js')
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const app = express()

app.use(morgan("dev")) // log the request for debugging
app.use(cookieParser())
app.use(express.json()) // parse json bodies
app.use(express.urlencoded({extended:true}))
app.use(cors())

// routes
app.use(authRoute)
app.use('/admin', adminRoute)
// 404 error
app.use((req, res) => 
    // console.log("Error 404"),
    res.status(404).send('404 Error Page')
)

mongoose.connect(DB_URL, {

    useNewUrlParser: true,
    
    useUnifiedTopology: true
    
}).then(() => app.listen(PORT,() => console.log(`server running on port : ${PORT}`))).catch((error) => console.log(error.message))
