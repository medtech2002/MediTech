// Import Mongoose
const mongoose = require('mongoose');

// Connect the Database
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected....");
}).catch((error) => {
    console.log(error);
})