/**

updateProfile - Updates user's first name, last name and/or username.
@param {object} req - Express request object.
@param {object} req.body - Request body containing first_name, last_name and/or username.
@param {string} req.headers.authorization - Bearer token for user authentication.
@param {object} res - Express response object.
@returns {object} - Returns a response containing a message and updated user information.
@throws {object} - Throws an error if user is unauthorized or user is not found.
*/
require('dotenv').config();
const JwT = require('jsonwebtoken');
const UserModel = require('../models/user.model');

const PrivateKey = process.env.PRIVATE_KEY;

exports.updateProfile = async (req, res) => {
    try {
        const { first_name, last_name, username } = req.body;
        const updateData = {};
        if (first_name) updateData.first_name = first_name;
        if (last_name) updateData.last_name = last_name;
        if (username) updateData.username = username;
        const bearerToken = req.headers.authorization;
        if (!bearerToken) return res.status(403).send({ message: "Unauthorized" })
        const accessToken = bearerToken.split(" ")[1];
        const { _id } = JwT.verify(accessToken, PrivateKey);

        const user = await UserModel.findByIdAndUpdate({ _id }, updateData, { returnDocument: 'after' });
        if (!user) return res.status(404).send({ message: "User not found!" });

        return res.status(201).send({ message: "User data updated", user });
    } catch (error) {
        return res.status(400).send({ message: error.message, error });
    }
};