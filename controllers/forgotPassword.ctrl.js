
/**
 * Sends a password reset email to the user.
*
* @async
 * @function forgotPassword
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body object.
 * @param {string} req.body.email - The email of the user.
 * @param {Object} res - The response object.
 * @returns {Object} - The response object containing the message.
 * @throws {Object} - The error object if there is an error during the process.
*/

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const UserModel = require("../models/user.model");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sanjayrathva091@gmail.com',
        pass: 'johwmzvlhexrzspk',
    },
});

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }
        const token = crypto.randomBytes(20).toString('hex');
        const expires = Date.now() + 3600000;
        user.resetToken = token;
        user.resetTokenExpiresAt = expires;
        await user.save();

        const resetUrl = `https://example.com/reset-password?token=${token}`;
        const message = {
            from: 'sanjayrathva091@gmail.com',
            to: email,
            subject: 'Password reset',
            text: `Click the link to reset your password: ${resetUrl}`,
        };
        await transporter.sendMail(message);

        return res.json({ message: 'Reset link sent.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { forgotPassword };