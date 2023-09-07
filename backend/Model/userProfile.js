// Import Mongoose
const mongoose = require('mongoose');
// Import Validator
const validator = require('validator');

// Create User Profile Schema
const userProfileSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    image: {
        data: Buffer,
        contentType: String,
    }
})

// Crate User Profile Collection
const UserProfile = mongoose.model("userprofiles", userProfileSchema);

// Exports User Profile Module
module.exports = UserProfile;