// Import Mongoose
const mongoose = require('mongoose');
// Import Validator
const validator = require('validator');

// Create Chat Schema
const chatSchema = mongoose.Schema({
    userchat: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId
            },
            fullname: {
                type: String
            },
            pic: {
                type: String
            },
            userType: {
                type: String
            }
        }
    ],
    message: [
        {
            reply_id: {
                type: mongoose.Schema.Types.ObjectId
            },
            reply: {
                type: String
            },
            replymsg_id: {
                type: mongoose.Schema.Types.ObjectId
            },
            sender_id: {
                type: mongoose.Schema.Types.ObjectId
            },
            content: {
                type: String
            },
            isDelete: {
                type: Boolean
            },
            createdAt: {
                type: Number,
                default: Number(Date.now())
            }
        }
    ]
})

// Crate Chat Collection
const Chat = mongoose.model("chats", chatSchema);

// Exports Chat Module
module.exports = Chat;