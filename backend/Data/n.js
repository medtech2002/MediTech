const fs=require('fs')
const data=require("./Ayurvedic.json");

// Extract the DiseaseNames from all objects
const extractedDiseaseNames = data.map(item => item.use_cases.DiseaseNames);

// Create a new object with the extracted disease names
const extractedData = { DiseaseNames: extractedDiseaseNames.flat() };

// Convert the extracted data to JSON
const extractedDataJson = JSON.stringify(extractedData, null, 2);

// Save the extracted data as a JSON file
fs.writeFileSync('extractedDiseaseData.json', extractedDataJson, 'utf-8');

console.log('Extracted data saved to extractedData.json');