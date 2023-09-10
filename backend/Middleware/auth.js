// Import JWT
const jwt = require('jsonwebtoken');

// Auth Function
const auth = (req, res, next) => {
    // Get the Token from Header
    const token = req.headers.authorization;

    // If the Token exists
    if (token && token.includes("Bearer")) {
        // Verify the token
        jwt.verify(token.split(" ")[1], process.env.SECRET_KEY, (err, user) => {
            // If Error Occurred
            if (err) {
                // Set Forbidden Error
                res.status(403).send(`Token is not Valid \n ${err}`);
            }
            // If User Exists
            else {
                // Set the user in request user
                req.user = user;
                // Run the Next process
                next();
            }
        })
    } else {
        // console.log(token);
        // Set Unathorized Status
        res.status(401).send("You Are Not Authenticated !!");
    }
}

module.exports = auth;