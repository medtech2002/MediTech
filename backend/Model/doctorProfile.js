// Import Mongoose
const mongoose = require('mongoose');
// Import Validator
const validator = require('validator');

// Create Doctor Profile Schema
const doctorProfileSchema = mongoose.Schema({
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    certificate: {
        data: Buffer,
        contentType: String,
    }
})

// Crate Doctor Profile Collection
const DoctorProfile = mongoose.model("doctorprofiles", doctorProfileSchema);

// Exports Doctor Profile Module
module.exports = DoctorProfile;