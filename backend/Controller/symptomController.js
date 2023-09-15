// Import Express
const express = require('express');
// Import Router
const router = new express.Router();

// Import AllSymptom Collection/Model
const AllSymptom = require("../Model/allsymptom");
// Import Symptom Collection/Model
const Symptom = require("../Model/symptoms");
// Import Symptom Collection/Model
const Ayur = require("../Model/ayurvedic");
// Import Authentication
const auth = require('../Middleware/auth');

// All Symptoms API
router.get("/all-symptoms/:id", auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            const allSymptom = await AllSymptom.find();

            // Set Ok Status
            return res.status(200).json(allSymptom);
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

// Symptoms Finder API
router.post("/symptom-find/:id", auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            // Get the symptoms from the request body
            const { symptoms } = req.body;

            // Find diseases that match the given symptoms
            const matchingDiseases = await Symptom.find({ Symptoms: { $all: symptoms } });

            if (matchingDiseases.length === 0) {
                // No matching diseases found
                return res.status(200).json({ message: 'No matching diseases found.' });
            }

            // Extract unmatched symptoms
            const unmatchedSymptoms = matchingDiseases.reduce((unmatched, disease) => {
                const matchedSymptoms = disease.Symptoms;
                symptoms.forEach((symptom) => {
                    const index = matchedSymptoms.indexOf(symptom);
                    if (index !== -1) {
                        matchedSymptoms.splice(index, 1);
                    }
                });
                unmatched[disease.DiseaseName] = matchedSymptoms;
                return unmatched;
            }, {});

            // Limit unmatched symptoms
            const limitedUnmatchedSymptoms = [];
            const diseaseNames = Object.keys(unmatchedSymptoms);

            for (let i = 0; i < diseaseNames.length; i++) {
                const diseaseName = diseaseNames[i];
                unmatchedSymptoms[diseaseName].map((um) => {
                    limitedUnmatchedSymptoms.push(um);
                })
            }

            // Create a Set from the array to remove duplicates
            const uniqueSet = new Set(limitedUnmatchedSymptoms);

            // Convert the Set back to an array (if needed)
            const uniqueArray = Array.from(uniqueSet);

            // Set Ok Status
            return res.status(200).json(uniqueArray);
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

// Disease and Medicine Finder API
router.post("/suggest-med/:id", auth, async (req, res) => {
    try {
        // If the user id and params id match
        if (req.user.id === req.params.id) {
            // Get the symptoms from the request body
            const { symptoms, durations } = req.body;

            // Find Symptoms
            const disease = await Symptom.find();

            let data;

            for (const d of disease) {
                // Check if all symptoms match
                const allSymptomsMatch = symptoms.every((symptom) => d.Symptoms.includes(symptom));

                // Find the matching duration
                const matchingDuration = d.Duration.find((duration) => duration.DurationName === durations);

                // If all symptoms match and a matching duration is found, return disease name and medicines
                if (allSymptomsMatch && matchingDuration) {
                    data = {
                        DiseaseName: d.DiseaseName,
                        Medicines: matchingDuration.Medicines
                    };

                    //  Set Ok Status
                    return res.status(200).json(data);
                }
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

// Exports the Router
module.exports = router;