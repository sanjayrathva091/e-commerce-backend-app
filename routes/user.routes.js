/**
 * User routes
 * @module routes/userRoutes
 */

const express = require('express');
const { forgotPassword } = require('../controllers/forgotPassword.ctrl');
const { loginUser } = require('../controllers/loginUser.ctrl');
const { registerUser } = require('../controllers/registerUser.ctrl');
const { resetPassword } = require('../controllers/resetPassword.ctrl');
const { updateProfile } = require('../controllers/updateProfile.ctrl');
const { userProfile } = require('../controllers/userProfile.ctrl');
const { getProducts } = require('../controllers/admin.ctrl');
const checkout = require('../controllers/checkout.ctrl');
const { getCart, addToCart, updateCart, removeFromCart } = require('../controllers/cart.ctrl');
const verifyToken = require('../middlewares/verifyToken');
const userRoutes = express.Router();

/**
 * User registration route
 * @name post/auth/register
 * @function
 * @memberof module:routes/userRoutes
 * @inner
 * @param {object} req - HTTP request object
 * @param {object} res - HTTP response object
 */
userRoutes.post('/auth/register', registerUser);

/**
 * User login route
 * @name post/auth/login
 * @function
 * @memberof module:routes/userRoutes
 * @inner
 * @param {object} req - HTTP request object
 * @param {object} res - HTTP response object
 */
userRoutes.post('/auth/login', loginUser);

/**
 * Forgot password route
 * @name post/auth/forgot_password
 * @function
 * @memberof module:routes/userRoutes
 * @inner
 * @param {object} req - HTTP request object
 * @param {object} res - HTTP response object
 */
userRoutes.post('/auth/forgot_password', forgotPassword);

/**
 * Password reset route
 * @name post/auth/reset_password
 * @function
 * @memberof module:routes/userRoutes
 * @inner
 * @param {object} req - HTTP request object
 * @param {object} res - HTTP response object
 */
userRoutes.post('/auth/reset_password', resetPassword);

/**
 * User profile route
 * @name get/user/profile
 * @function
 * @memberof module:routes/userRoutes
 * @inner
 * @param {object} req - HTTP request object
 * @param {object} res - HTTP response object
 */
userRoutes.get('/user/profile', userProfile);

/**
 * Update user profile route
 * @name put/user/profile
 * @function
 * @memberof module:routes/userRoutes
 * @inner
 * @param {object} req - HTTP request object
 * @param {object} res - HTTP response object
 */
userRoutes.put('/user/profile', updateProfile);

/**
 * Admin products route
 * @name get/user/products
 * @function
 * @memberof module:routes/userRoutes
 * @inner
 * @param {object} req - HTTP request object
 * @param {object} res - HTTP response object
 */
userRoutes.get('/user/products', getProducts);

userRoutes.get('/user/get/cart', [verifyToken], getCart);

userRoutes.post('/user/add/cart', [verifyToken], addToCart);

userRoutes.patch('/user/update/cart', [verifyToken], updateCart);

userRoutes.delete('/user/remove/cart', [verifyToken], removeFromCart);

/**
 * Checkout route
 * @name post/checkout
 * @function
 * @memberof module:routes/userRoutes
 * @inner
 * @param {object} req - HTTP request object
 * @param {object} res - HTTP response object
 */
userRoutes.post('/checkout', checkout);

module.exports = userRoutes;
