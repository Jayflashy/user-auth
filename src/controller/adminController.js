// import model
const User = require("../models/userModel")
const bcrypt = require('bcrypt')

const getUser = async( req, res) => {
    const id = req.params.id
    console.log(id)
    const user = await User.findById(id)
        // .then((result) => {
        //     res.send(result)
        // })
        // .catch((err) => {
        //     console.log(err)
        //     res.send("something is wrong")
        // })
    if (!user) {
        console.log("user not found")
        res.status(401).send("This user does not exist")
    } else {
        console.log("user found")
        res.status(201).json({"message": "User exists in our database", "user": user})
    }
    
}

const allUsers = async(req, res) => {
    const users = await User.find()
        // .then((result) => {
        //     res.send(result)
        // })
        // .catch((err) => {
        //     console.log(err)
        //     res.send("something is wrong")
        // })
    if (!users) {
        console.log("Something went wrong")
        res.status(401).send("Something went wrong")
    } else {
        console.log("All users")
        res.status(201).json({"message": "All Users", "users": users})
    }
}
module.exports ={ getUser, allUsers }