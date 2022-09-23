const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saveUser = async (req, res) => {
    const { name, username, password, email, phone } = req.body;
    npassword = bcrypt.hashSync(password, 12)
    try {
        const checkUser = await User.findOne({email}) 
        const checkUsername = await User.findOne({username}) 
        const checkUserphone = await User.findOne({phone}) 
        if (checkUser , checkUsername, checkUserphone)
        {
            console.log("user already exist")
        }else {
            // create new user
            const newUser = new User({ name, username, password:npassword, email, phone })
            res.send("User already exist").status(422)
            const savedUser = await newUser.save();
            if (!savedUser) {
                console.log("user not saved")
                res.status(401).send("User has not been saved")
            } else {
                console.log("user created successfull")
                res.status(201).json({"message": "USer saved", "user": savedUser})
            }
        }
    } catch (error) {
        console.log(error)
        res.status(501).send("Something went wrong")
    }

}
const loginUser = async (req, res) => {
    const {username, password} = req.body
    // check if username exists 
    const user = await User.findOne({username})
    if(!user){
        console.log('User does not exist')
        res.status(501).send('User does not exist')
        return
    }
    // check if password is correct
    bcrypt.compare(password, user['password'], function(err, result) {
        if(result == true) {
            // log user in
            const token = jwt.sign({id:user._id}, process.env.SECRET_KEY);
            // console.log(token)
            const {password, __v, ...others} = user.toObject();
            res.cookie("auth_token", token, {httpOnly:true,}).status(200).json({"message":"You are successfully logged in to the server", "user": others})
        }
        else{
            res.status(403).send("Wrong password")
        }
    })
}

const logoutUser = async(req, res, next) => {
    // check if user is logged in 
    const token = req.cookies.auth_token;
    if (!token) {
        return res.status(401).send("youre not authenticated")
    }
    // check if token is valid
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err){
            return res.status(403).send("your token is not valid")
        }
        // return user;
        // delete cookies 
        res.clearCookie("auth_token").status(201).send("logged out successful")
    })
    
}
const verifyUser = (token) =>{
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err){
            return res.status(403).send("your token is not valid")
        }
        return user;
        // 
    })
    
}
module.exports = { saveUser, loginUser, logoutUser }