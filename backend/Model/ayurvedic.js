// Import Mongoose
const mongoose = require("mongoose");
// Import Validator
const validator = require("validator");

// Create Disease Schema
const ayurSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  ingrediants: [],
  use_cases: {
    DiseaseNames: [],
    Contraindications: [],
  },
  source: {
    type: String,
  },
  synonyms: [],
});

// Crate Disease Collection
const Ayurvedic = mongoose.model("ayurvedics", ayurSchema);

// Exports Disease Module
module.exports = Ayurvedic;
