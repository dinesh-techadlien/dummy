const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    console.log('Received Token:', token);
    if (!token) return res.sendStatus(401); // Unauthorized if no token provided
    jwt.verify(token, 'your-secret-key', (err, user) => {
      if (err) {
        console.error('Token Verification Error:', err);
        return res.sendStatus(403); // Forbidden if token is invalid
      }
      console.log('Decoded User:', user);
      req.user = user;
      next(); // Pass the execution to the next middleware
    });
}