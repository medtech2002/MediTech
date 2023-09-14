// Import Express
const express = require('express');
// Import Router
const router = new express.Router();

// Import User Collection/Model
const User = require("../Model/user");
// Import Doctor Collection/Model
const Doctor = require("../Model/doctor");
// Import Admin Collection/Model
const Admin = require("../Model/admin");
// Import Medicine Collection/Model
const Medicine = require("../Model/medicine");
// Import Authentication
const auth = require('../Middleware/auth');

// Add Medicine API
router.post("/add-medicine/:id", auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            const admin = await Admin.findById({ _id: req.params.id });

            if (!admin) {
                // Set Unathorized Status
                return res.status(401).send("Unauthorized Access");
            }

            //  Take the details from body
            const { name, pic, price, inStock, composition, usage, sideEffects } = req.body;

            // Take Medicine Data
            let medicine = await Medicine.find();

            // Create Medicine
            medicine = new Medicine({
                name,
                pic,
                price,
                inStock,
                composition,
                usage,
                sideEffects,
                createdAt: Number(Date.now())
            })

            //  Save the Document in the Medicine Collection
            const createMed = await medicine.save();

            //  Set Created Status
            res.status(201).send(createMed);
        } else {
            // Set Internal Server Error Status
            return res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        console.log(error);
        // Set Internal Server Error Status
        return res.status(500).send("Server Error !!");
    }
})

// Get All Medicine API
router.get("/all-medicine/:id", auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            // Take Medicine Data
            let medicine = await Medicine.find();

            //  Set Ok Status
            res.status(200).json(medicine);
        } else {
            // Set Internal Server Error Status
            return res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        console.log(error);
        // Set Internal Server Error Status
        return res.status(500).send("Server Error !!");
    }
})

// Get Perticular Medicine API
router.get("/per-medicine/:id", auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            // Take Medicine Data
            let medicine = await Medicine.findOne({ _id: req.body._id });

            //  Set Ok Status
            res.status(200).json(medicine);
        } else {
            // Set Internal Server Error Status
            return res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        console.log(error);
        // Set Internal Server Error Status
        return res.status(500).send("Server Error !!");
    }
})

// Delete Perticular Medicine API
router.delete("/delete-medicine/:id", auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            // Take Medicine Data
            let medicine = await Medicine.findByIdAndDelete({ _id: req.body._id });

            //  Set Ok Status
            res.status(200).send(medicine);
        } else {
            // Set Internal Server Error Status
            return res.status(500).send("You can only view your own account !!");
        }
    } catch (error) {
        console.log(error);
        // Set Internal Server Error Status
        return res.status(500).send("Server Error !!");
    }
})

// Exports the Router
module.exports = router;