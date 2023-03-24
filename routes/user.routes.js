const express = require('express');
const { forgotPassword } = require('../controllers/forgotPassword.ctrl');
const { loginUser } = require('../controllers/loginUser.ctrl');
const { registerUser } = require('../controllers/registerUser.ctrl');
const { resetPassword } = require('../controllers/resetPassword.ctrl');
const { updateProfile } = require('../controllers/updateProfile.ctrl');
const { userProfile } = require('../controllers/userProfile.ctrl');
const userRoutes = express.Router();

userRoutes.post('/auth/register', registerUser);
userRoutes.post('/auth/login', loginUser);
userRoutes.post('/auth/forgot_password', forgotPassword);
userRoutes.post('/auth/reset_password', resetPassword);

userRoutes.get('/user/profile', userProfile);
userRoutes.put('/user/profile', updateProfile);

module.exports = userRoutes;