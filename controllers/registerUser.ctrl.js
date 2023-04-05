// import module
const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');

/**
 * Registers a new user with hashed password.
 * @function
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - Returns a JSON object containing the user document and a success message.
 */
exports.registerUser = async (req, res) => {
    try {
        let { password } = req.body;
        password = bcrypt.hashSync(password, 8);
        const user = new UserModel({ ...req.body, password });
        const save = await user.save();
        return res.status(201).send({ message: "Registration successful", doc: save });
    } catch (error) {
        switch (error.code) {
            case 11000:
                return res.status(203).send({ message: "User already exists", error: error.message });
            default:
                return res.status(400).send({ message: error.message, error: error });
        }
    }
};
