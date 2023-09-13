// Import Mongoose
const mongoose = require('mongoose');
// Import Validator
const validator = require('validator');

// Create Symptom Schema
const symptomsSchema = mongoose.Schema({
    DiseaseName: {
        type: String,
    },
    Symptoms: [
        {
            type: String
        }
    ],
    Duration: [
        {
            DurationName: {
                type: String
            },
            Medicines: [
                {
                    type: String
                }
            ]
        }
    ]
})

// Crate Symptom Collection
const Symptom = mongoose.model("symptoms", symptomsSchema);

// Exports Symptom Module
module.exports = Symptom;