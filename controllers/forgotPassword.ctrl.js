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


exports.forgotPassword = async (req, res) => {
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