/**

Middleware to authorize access to restricted routes.
@module authorize
@param {Object} req - Express request object
@param {Object} res - Express response object
@param {Function} next - Express next middleware function
*/
require('dotenv').config();
const JwT = require('jsonwebtoken');
const PrivateKey = process.env.PRIVATE_KEY;

const authorize = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        const accessToken = bearerToken.split(" ")[1];
        const { role } = JwT.verify(accessToken, PrivateKey);
        if (role === 'Admin') return next();
        return res.status(403).json({ message: 'Access denied' });
    } catch (error) {
        return res.json({ error: error.message });
    }
};

module.exports = authorize;