// Import Mongoose
const mongoose = require('mongoose');
// Import Validator
const validator = require('validator');

// Create Medicine Schema
const medicineSchema = mongoose.Schema({
    name: {
        type: String
    },
    pic: {
        type: String
    },
    price: {
        type: String
    },
    inStock: {
        type: Boolean
    },
    composition: {
        type: String
    },
    usage: {
        type: String
    },
    sideEffects: [
        {
            type: String
        }
    ],
    createdAt: {
        type: Number,
        default: Number(Date.now())
    }
})

// Crate Medicine Collection
const Medicine = mongoose.model("medicines", medicineSchema);

// Exports Medicine Module
module.exports = Medicine;