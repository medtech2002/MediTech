// Import Mongoose
const mongoose = require('mongoose');
// Import Validator
const validator = require('validator');

// Create Doctor Schema
const doctorSchema = mongoose.Schema({
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
    address: {
        type: String
    },
    about: {
        type: String
    },
    isBusy: {
        type: Boolean
    }
})

// Crate Doctor Collection
const Doctor = mongoose.model("doctors", doctorSchema);

// Exports Doctor Module
module.exports = Doctor;