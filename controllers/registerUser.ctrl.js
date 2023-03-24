require('dotenv').config();
const bcrypt = require('bcrypt');
const UserModel = require("../models/user.model");


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