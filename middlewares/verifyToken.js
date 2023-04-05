require('dotenv').config();
const jwt = require('jsonwebtoken');

const PrivateKey = process.env.PRIVATE_KEY;

const verifyToken = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        const accessToken = bearerToken.split(' ')[1];
        const { _id, role } = jwt.verify(accessToken, PrivateKey);
        req.user = {
            id: _id,
            role
        }
        return next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = verifyToken;