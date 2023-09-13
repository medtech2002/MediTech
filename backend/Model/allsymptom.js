// Import Mongoose
const mongoose = require('mongoose');
// Import Validator
const validator = require('validator');

// Create All Symptom Schema
const allSymptomsSchema = mongoose.Schema({
    symptom: {
        type: String,
    },
})

// Crate All Symptom Collection
const AllSymptom = mongoose.model("allsymptoms", allSymptomsSchema);

// Exports All Symptom Module
module.exports = AllSymptom;