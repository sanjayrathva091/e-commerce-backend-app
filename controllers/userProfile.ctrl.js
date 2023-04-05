require('dotenv').config();
const JwT = require('jsonwebtoken');
const UserModel = require("../models/user.model");

const PrivateKey = process.env.PRIVATE_KEY;

/**
 * Get current user profile.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {Promise<void>}
 */
exports.userProfile = async (req, res) => {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) return res.status(403).send({ message: "Unauthorized" })
        const accessToken = bearerToken.split(" ")[1];
        const { _id } = JwT.verify(accessToken, PrivateKey);

        const user = await UserModel.findById({ _id });
        if (!user) return res.status(404).send({ message: "User not found!" });
        return res.status(200).send({ message: 'Current User', user })
    } catch (error) {
        switch (error) {
            case '':
                break;
            default:
                return res.status(400).send({ message: error.message });
        }
    }
};
