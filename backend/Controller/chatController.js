// Import Express
const express = require('express');
// Import Router
const router = new express.Router();

// Import User Collection/Model
const User = require("../Model/user");
// Import Doctor Collection/Model
const Doctor = require("../Model/doctor");
// Import Chat Collection/Model
const Chat = require('../Model/chat');
// Import Authentication
const auth = require('../Middleware/auth');

// Created Chat API
router.post("/chat-start/:id", auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            // Take the user id from params id
            const user_id = req.params.id;

            //  Take the details from body
            const { chat_id, person_id, userType } = req.body;

            let chats;

            if (chat_id) {
                //  Find the Chat
                chats = await Chat.findOne({ _id: chat_id });
            }

            //  If the Chat is Present
            if (chats) {
                // Search the UserChat
                const userChat = chats.userchat;

                // Check Valid Chat or not
                const isValidChat = (
                    // First Condition => check User is connecting to Doctor
                    (userChat[0].user_id.toString() === user_id && userChat[0].userType === "user" && userChat[1].user_id.toString() === person_id && userChat[1].userType.toLowerCase() === userType) ||
                    // Second Condition => check Doctor is connecting to User
                    (userChat[0].user_id.toString() === person_id && userChat[0].userType === userType && userChat[1].user_id.toString() === user_id && userChat[1].userType.toLowerCase() === "doctor")
                );

                if (!isValidChat) {
                    // Set Internal Server Error Status
                    return res.status(500).send("Invalid Chat Details!!");
                }
                else {
                    // Set Ok Status and send the Chats
                    return res.status(200).send(chats);
                }
            }
            // If the Chat not present then create a new Chat and also check User is connecting to Doctor
            else if (userType.toLowerCase() === 'doctor') {
                // Take the User Details
                let user = await User.findOne({ _id: user_id });
                // Take the Doctor Details
                let doctor = await Doctor.findOne({ _id: person_id });

                // If User and Doctor both are present then create a new Chat
                if (user && doctor) {
                    // Set UserDetails Data
                    let userDetails = [
                        {
                            user_id: user._id,
                            fullname: user.fullname,
                            userType: user.userType
                        },
                        {
                            user_id: doctor._id,
                            fullname: doctor.fullname,
                            userType: doctor.userType
                        }
                    ]

                    // Set the Collection Field with Data
                    chats = new Chat({
                        userchat: userDetails,
                        message: []
                    })

                    //  Save the Document in the Chat Collection
                    const createChat = await chats.save();

                    //  Set Created Status
                    return res.status(201).json(createChat);
                } else {
                    // Set Internal Server Error Status
                    return res.status(500).send("Invalid Chat Details!!");
                }
            } else {
                // Set Internal Server Error Status
                return res.status(500).send("Invalid Chat Details!!");
            }
        } else {
            // Set Internal Server Error Status
            return res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        // console.log(error);
        // Set Internal Server Error Status
        return res.status(500).send("Server Error !!");
    }
})

// Send Message API
router.post("/message/:id", auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            // Take the user id from params id
            const user_id = req.params.id;

            //  Take the details from body
            const { chat_id, content, reply_id, reply, replymsg_id } = req.body;

            let chats;

            if (chat_id) {
                //  Find the Chat
                chats = await Chat.findOne({ _id: chat_id });
            }

            if (chats) {
                // Search the UserChat
                const userChat = chats.userchat;
                //  Check the Sending user is present or not in the Chat
                const isPresent = userChat.findIndex((p) => {
                    return p.user_id.toString() === user_id;
                });

                //  If present then send the message
                if (isPresent !== -1) {
                    //  Check the Receiver user is present or not in the Chat for Replying a specific chat
                    if (reply_id && reply && replymsg_id) {
                        const isMsg = chats.message.findIndex((m) => {
                            return m._id.toString() === replymsg_id && m.sender_id.toString() === reply_id && !m.isDelete;
                        })

                        // If present then send the message
                        if (isMsg !== 1) {
                            chats.message.push({
                                reply_id,
                                reply,
                                replymsg_id,
                                sender_id: user_id,
                                content,
                                createdAt: Date.now(),
                                isDelete: false
                            });
                        } else {
                            // Set Internal Server Error Status
                            return res.status(500).send("Invalid Message User!!");
                        }
                    } else {
                        // Push the new message in the array
                        chats.message.push({
                            sender_id: user_id,
                            content,
                            createdAt: Date.now(),
                            isDelete: false
                        });
                    }

                    //  Save the Document in the Chat Collection
                    const sendMsg = await chats.save();

                    //  Take Message
                    const message = chats.message;
                    //  If Message present
                    if (message.length !== 0) {
                        //  Sort the Message according to time
                        // message.sort((a, b) => b.createdAt - a.createdAt);
                        // Set Ok Status and send the Message
                        return res.status(200).json(message)
                    }

                    // Set Internal Server Error Status
                    return res.status(500).send("Invalid Message User!!");
                } else {
                    // Set Internal Server Error Status
                    return res.status(500).send("Invalid Message User!!");
                }
            } else {
                // Set Internal Server Error Status
                return res.status(500).send("Invalid Chat Details!!");
            }

        } else {
            // Set Internal Server Error Status
            return res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        // console.log(error);
        // Set Internal Server Error Status
        return res.status(500).send("Server Error !!");
    }
})

// Delete Message API
router.delete("/del-message/:id", auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            // Take the user id from params id
            const user_id = req.params.id;

            //  Take the details from body
            const { chat_id, msg_id } = req.body;

            let chats;

            if (chat_id) {
                //  Find the Chat
                chats = await Chat.findOne({ _id: chat_id });
            }

            if (chats) {
                // Search the UserMsg
                let userMsg = chats.message;
                //  Check the Sending user is present or not in the Chat
                const isMsg = userMsg.findIndex((m) => {
                    return m.sender_id.toString() === user_id && m._id.toString() == msg_id && !m.isDelete;
                })

                // If present remove the content of the chat
                if (isMsg !== -1) {
                    userMsg[isMsg].content = "Deleted!!";
                    userMsg[isMsg].isDelete = true;
                } else {
                    // Set Internal Server Error Status
                    return res.status(500).send("Invalid Message User!!");
                }

                //  Save the Document in the Chat Collection
                const sendMsg = await chats.save();

                //  Take Message
                const message = chats.message;
                //  If Message present
                if (message.length !== 0) {
                    //  Sort the Message according to time
                    // message.sort((a, b) => b.createdAt - a.createdAt);
                    // Set Ok Status and send the Message
                    return res.status(200).json(message)
                }

                // Set Internal Server Error Status
                return res.status(500).send("Invalid Message User!!");
            } else {
                // Set Internal Server Error Status
                return res.status(500).send("Invalid Chat Details!!");
            }

        } else {
            // Set Internal Server Error Status
            return res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        // console.log(error);
        // Set Internal Server Error Status
        return res.status(500).send("Server Error !!");
    }
})

// Get All Chats API
router.get("/all-chats/:id", auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            // Take the user id from params id
            const user_id = req.params.id;

            //  Find all Chats
            const chats = await Chat.find();

            //  All User Chat Empty Array
            let allUserChat = [];

            // Iterating Chats Array
            chats.forEach((c) => {
                // Check the Current User is present or not in the Array
                const userChat = c.userchat.find((u) => u.user_id.toString() === user_id);
                // If Present
                if (userChat) {
                    // Take details of the Oponent User
                    const otherUserChat = c.userchat.filter((u) => u.user_id.toString() !== user_id);
                    // Take details of the Oponent User First Array
                    const opChat=otherUserChat[0];
                    //   Push into the Chat
                    allUserChat.push(
                        {
                            chat_id: c._id,
                            opChat
                        }
                    );
                }
            });
            // Set Ok Status and send the Chat Details
            res.status(200).json(allUserChat);
        } else {
            // Set Internal Server Error Status
            return res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        // console.log(error);
        // Set Internal Server Error Status
        return res.status(500).send("Server Error !!");
    }
})

// Exports the Router
module.exports = router;