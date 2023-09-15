// Import Express
const express = require('express');
// Import Router
const router = new express.Router();
// Import JWT
const jwt = require('jsonwebtoken');
// Import bcryptjs
const bcryptjs = require('bcryptjs');

// Import Admin Collection/Model
const Admin = require("../Model/admin");
// Import Admin Profile Collection/Model
const AdminProfile = require("../Model/adminProfile");
// Import User Collection/Model
const User = require("../Model/user");
// Import User Profile Collection/Model
const UserProfile = require("../Model/userProfile");
// Import Doctor Collection/Model
const Doctor = require("../Model/doctor");
// Import Doctor Profile Collection/Model
const DoctorProfile = require("../Model/doctorProfile");
// Import Authentication
const auth = require('../Middleware/auth');

// Hash Password Func
const hashPassword = async (ps) => {
    // Generating the Salt
    const secPass = await bcryptjs.genSalt(Number(process.env.SALT));
    // Hashing the Password
    return await bcryptjs.hash(ps, secPass);
}

// SIGN UP API
router.post("/register", async (req, res) => {
    try {
        // Extract the data
        const { fullname, email, password, userType } = req.body;

        // Conditions
        switch (userType.toLowerCase()) {
            // For Admin
            /*
            case "admin":
                // Check the email is already exists or not
                let admin = await Admin.findOne({ email });
                // If exists the email
                if (admin) {
                    // Set Conflict Status
                    res.status(409).send("Admin Already Registered !!");
                } else {
                    const newPass = await hashPassword(password);

                    // Set the Collection Field with Data
                    admin = new Admin({
                        fullname,
                        email,
                        password: newPass,
                        userType: userType.toLowerCase(),
                    })

                    //  Save the Document in the Perticular User Type Collection
                    const createAdmin = await admin.save();
                    //  Set Created Status
                    res.status(201).send(createAdmin);
                }
                break;
            */
            // For User
            case "user":
                // Check the email is already exists or not
                let user = await User.findOne({ email });
                // If exists the email
                if (user) {
                    // Set Conflict Status
                    res.status(409).send("User Already Registered !!");
                } else {
                    const newPass = await hashPassword(password);

                    // Set the Collection Field with Data
                    user = new User({
                        fullname,
                        email,
                        password: newPass,
                        userType: userType.toLowerCase(),
                    })

                    //  Save the Document in the Perticular User Type Collection
                    const createUser = await user.save();

                    //  Set Created Status
                    res.status(201).send(createUser);
                }
                break;
            // For Doctor
            case "doctor":
                // Check the email is already exists or not
                let doctor = await Doctor.findOne({ email });
                // If exists the email
                if (doctor) {
                    // Set Conflict Status
                    res.status(409).send("Already Registered !!");
                } else {
                    const newPass = await hashPassword(password);

                    // Set the Collection Field with Data
                    doctor = new Doctor({
                        fullname,
                        email,
                        password: newPass,
                        userType: userType.toLowerCase(),
                    })

                    //  Save the Document in the Perticular User Type Collection
                    const createDoctor = await doctor.save();
                    //  Set Created Status
                    res.status(201).send(createDoctor);
                }
                break;
            default:
                //  Set Bad Request Status
                res.status(400).send("Server Error !!");
        }
    } catch (error) {
        console.log(error);
        //  Set Bad Request Status
        res.status(400).send(`${error}`);
    }
})

// Create Token Func
const createToken = (pson) => {
    return jwt.sign({ id: pson._id }, process.env.SECRET_KEY,
        {
            // Token expires by 365 days or 1 after year
            expiresIn: "365d"
        }
    );
}

// SIGN IN API
router.post("/login", async (req, res) => {
    try {
        // Extract the data
        const { email, password, userType } = req.body;

        // Conditions
        switch (userType.toLowerCase()) {
            // For Admin
            case "admin":
                // Check the Email is exists or not
                let logAdmin = await Admin.findOne({ email });

                // If not exists
                if (!logAdmin) {
                    //  Set Not Found Status
                    res.status(404).send("Not Registered !!")
                }
                // If exists
                else {
                    // Compare the password with database password
                    const comparePassword = await bcryptjs.compare(password, logAdmin.password);
                    // If the Password is wrong
                    if (!comparePassword) {
                        //  Set Not Found Status
                        res.status(404).send("Password is Incorrect !!")
                    }
                    // If the Password is Correct
                    else {
                        // Create a token by secret key
                        const token = createToken(logAdmin);

                        // Set Ok Status
                        res.status(200).json({ token, userid: logAdmin._id, type: logAdmin.userType })
                    }
                }
                break;
            // For User
            case "user":
                // Check the Email is exists or not
                let logUser = await User.findOne({ email });

                // If not exists
                if (!logUser) {
                    //  Set Not Found Status
                    res.status(404).send("User Not Registered !!")
                }
                // If exists
                else {
                    // Compare the password with database password
                    const comparePassword = await bcryptjs.compare(password, logUser.password);
                    // If the Password is wrong
                    if (!comparePassword) {
                        //  Set Not Found Status
                        res.status(404).send("Password is Incorrect !!")
                    }
                    // If the Password is Correct
                    else {
                        // Create a token by secret key
                        const token = createToken(logUser);

                        // Set Ok Status
                        res.status(200).json({ token, userid: logUser._id, type: logUser.userType })
                    }
                }
                break;
            // For Doctor
            case "doctor":
                // Check the Email is exists or not
                let logDoctor = await Doctor.findOne({ email });

                // If not exists
                if (!logDoctor) {
                    //  Set Not Found Status
                    res.status(404).send("You are Not Registered !!")
                }
                // If exists
                else {
                    // Compare the password with database password
                    const comparePassword = await bcryptjs.compare(password, logDoctor.password);
                    // If the Password is wrong
                    if (!comparePassword) {
                        //  Set Not Found Status
                        res.status(404).send("Password is Incorrect !!")
                    }
                    // If the Password is Correct
                    else {
                        // Create a token by secret key
                        const token = createToken(logDoctor);

                        // Set Ok Status
                        res.status(200).json({ token, userid: logDoctor._id, type: logDoctor.userType })
                    }
                }
                break;
            default:
                //  Set Bad Request Status
                res.status(400).send("Server Error !!");
        }
    } catch (error) {
        console.log(error);
        //  Set Bad Request Status
        res.status(400).send(`${error}`);
    }
})

// Get Details API
router.get("/get-details/:id/:type", auth, async (req, res) => {
    try {
        if (req.user.id === req.params.id) {
            // Conditions
            switch (req.params.type.toLowerCase()) {
                // For Admin
                case "admin":
                    // Check the email is already exists or not
                    let admin = await Admin.findById({ _id: req.params.id });
                    // If exists the email
                    if (!admin) {
                        // Set Conflict Status
                        return res.status(500).send("Server Error !!");
                    } else {
                        //  Set Ok Status
                        return res.status(200).send(admin);
                    }
                    break;
                // For User
                case "user":
                    // Check the email is already exists or not
                    let user = await User.findOne({ _id: req.params.id });
                    // If exists the email
                    if (!user) {
                        // Set Conflict Status
                        return res.status(500).send("Server Error !!");
                    } else {
                        //  Set Ok Status
                        return res.status(200).send(user);
                    }
                    break;
                // For Doctor
                case "doctor":
                    // Check the email is already exists or not
                    let doctor = await Doctor.findOne({ _id: req.params.id });
                    // If exists the email
                    // If exists the email
                    if (!doctor) {
                        // Set Conflict Status
                        return res.status(500).send("Server Error !!");
                    } else {
                        //  Set Ok Status
                        return res.status(200).send(doctor);
                    }
                    break;
                default:
                    //  Set Bad Request Status
                    return res.status(400).send("Server Error !!");
            }
        }
        else {
            // Set Internal Server Error Status
            return res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        console.log(error);
        //  Set Bad Request Status
        res.status(400).send(`${error}`);
    }
})

// Exports the Router
module.exports = router;