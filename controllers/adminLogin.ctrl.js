// Import the module
const bcrypt = require('bcrypt');
const JwT = require('jsonwebtoken');
const UserModel = require("../models/user.model");

/**
 * Admin login function
 * @function
 * @async
 * @param {object} req - The HTTP request object
 * @param {object} res - The HTTP response object
 * @returns {object} - HTTP response with success message and access token if login is successful
 * @throws {object} - HTTP response with error message if login fails
 */
exports.adminLogin = async (req, res) => {
    try {
        const user = req.body;
        const oldUser = await UserModel.findOne({ email: user.email });

        if (!oldUser) {
            return res.status(404).send({ message: "User does not exist" });
        }

        if (oldUser.role !== 'Admin') {
            return res.status(403).send({ error: "Unauthorized! Only administrator can access" });
        }

        const isMatched = bcrypt.compareSync(user.password, oldUser.password);

        if (!isMatched) {
            return res.status(401).send({ message: 'Login failed', error: "Invalid credential" });
        }

        const accessToken = JwT.sign({ _id: oldUser._id, role: oldUser.role }, process.env.PRIVATE_KEY);

        return res.status(201).send({ message: 'Login successful', accessToken });
    } catch (error) {
        switch (error.code) {
            case 's':
                // Handle the error case here if needed
                break;

            default:
                return res.status(400).json({ message: error.message, error: error });
        }
    }
};
