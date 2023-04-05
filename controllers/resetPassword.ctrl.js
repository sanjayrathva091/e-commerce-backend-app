/**
 * Reset user password using reset token.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.body.token - Reset token sent to user email.
 * @param {string} req.body.password - New password for user.
 * @returns {Object} - Returns response object with status and message.
 * @throws {Object} - Throws error object with message.
 */
const bcrypt = require('bcrypt');
const UserModel = require("../models/user.model");

exports.resetPassword = async (req, res) => {
    const { token, password } = req.body;

    try {
        const user = await UserModel.findOne({
            resetToken: token,
            resetTokenExpiresAt: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(404).json({ message: 'Invalid or expired token.' })
        }
        user.password = bcrypt.hashSync(password, 8);
        user.resetToken = null;
        user.resetTokenExpiresAt = null;
        await user.save();
        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
