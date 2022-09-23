const mongoose = require('mongoose')

const {Schema, model} = mongoose ;// import Schema & model

// User Schema
const UserSchema = new Schema({
    
    username: {type: String, unique: true, required: true, trim:true},
    phone: {type: Number, unique: true, trim:true},
    password: {type: String, required: true, minlength:8, trim:true},
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        maxlength: [30, 'Username must be less than or equal to 10 characters.'], 
        trim:true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        trim:true
    },
    passwordChangedAt: Date,
    passwordtoken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false
    }
},
{
    timestamps: {
    }
})


/**
 * User Delete
 */
UserSchema.pre(/^find/, function (next) {
    // This Points to the current query
    this.find({ active: { $ne: false } });
    next();
});

// User model
const User = model("User", UserSchema)

module.exports = User