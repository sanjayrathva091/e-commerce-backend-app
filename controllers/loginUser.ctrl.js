require('dotenv').config();
const bcrypt = require('bcrypt');
const JwT = require('jsonwebtoken');
const UserModel = require("../models/user.model");

const PrivateKey = process.env.PRIVATE_KEY;

exports.loginUser = async (req, res) => {
    try {
        const user = req.body;
        const oldUser = await UserModel.findOne({ email: user.email });
        if (!oldUser) return res.status(404).send({ message: "User does not exist" });
        const isMatched = bcrypt.compareSync(user.password, oldUser.password);
        if (!isMatched) return res.status(401).send({ message: 'Login failed', error: "Invalid credential" });
        const accessToken = JwT.sign({ _id: oldUser._id }, PrivateKey);
        return res.status(201).send({ message: 'Login successful', accessToken });
    } catch (error) {
        switch (error.code) {
            case 's':

                break;

            default:
                return res.status(400).json({ message: error.message, error: error });
        }
    }
};