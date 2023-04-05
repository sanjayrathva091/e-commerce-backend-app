const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String, },
    username: { type: String },
    role: {
        type: String,
        required: true,
        enum: ['Customer', 'Admin'],
        default: 'Customer'
    },
    email: { type: String },
    password: { type: String },
    resetToken: { type: String },
    resetTokenExpiresAt: { type: Number },
    wrongPasswordCount: { type: Number },
    blockedUntil: { type: Date },
}, {
    timestamps: true
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;