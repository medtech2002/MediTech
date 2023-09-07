// Import Mongoose
const mongoose = require('mongoose');
// Import Validator
const validator = require('validator');

// Create Admin Schema
const adminSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email ID !!");
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
    },
    about: {
        type: String
    }
})

// Crate Admin Collection
const Admin = mongoose.model("admins", adminSchema);

// Exports Admin Module
module.exports = Admin;