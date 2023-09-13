// Import Mongoose
const mongoose = require('mongoose');
// Import Validator
const validator = require('validator');

// Create Disease Schema
const diseaseSchema = mongoose.Schema({
    disease: {
        type: String,
    },
})

// Crate Disease Collection
const Disease = mongoose.model("diseases", diseaseSchema);

// Exports Disease Module
module.exports = Disease;