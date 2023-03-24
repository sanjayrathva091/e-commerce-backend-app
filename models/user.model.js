const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String, },
    username: { type: String },
    email: { type: String },
    password: { type: String },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;