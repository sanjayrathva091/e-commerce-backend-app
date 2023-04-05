// import module
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user.model");

const PrivateKey = process.env.PRIVATE_KEY;
/**
 * Login user
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {Promise<void>}
 */
exports.loginUser = async (req, res) => {
    try {
        const user = req.body;
        const oldUser = await UserModel.findOne({ email: user.email });

        if (!oldUser) {
            return res.status(404).send({ message: "User does not exist" });
        }

        const isMatched = bcrypt.compareSync(user.password, oldUser.password);

        if (!isMatched) {
            oldUser.wrongPasswordCount += 1;

            if (oldUser.wrongPasswordCount >= 5) {
                oldUser.blockedUntil = Date.now() + (24 * 60 * 60 * 1000); // block for 24 hours
            } else if (oldUser.wrongPasswordCount >= 7) {
                oldUser.blockedUntil = Date.now() + (12 * 60 * 60 * 1000); // block for 12 hours
            }

            await oldUser.save();
            return res.status(401).send({ message: 'Login failed', error: "Invalid credential" });
        }

        // Reset wrong password count
        oldUser.wrongPasswordCount = 0;
        oldUser.blockedUntil = null;
        await oldUser.save();

        const accessToken = jwt.sign({ _id: oldUser._id }, PrivateKey);
        return res.status(201).send({ message: 'Login successful', accessToken });
    } catch (error) {
        if (error.code === 's') {
            // Handle specific error
        } else {
            return res.status(400).json({ message: error.message });
        }
    }
};
