// Import Mongoose
const mongoose = require('mongoose');
// Import Validator
const validator = require('validator');

// Create Admin Profile Schema
const adminProfileSchema = mongoose.Schema({
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    image: {
        data: Buffer,
        contentType: String,
    }
})

// Crate Admin Profile Collection
const AdminProfile = mongoose.model("adminprofiles", adminProfileSchema);

// Exports Admin Profile Module
module.exports = AdminProfile;