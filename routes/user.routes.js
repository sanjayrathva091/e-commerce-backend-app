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
const { getOrders } = require('../controllers/orders.ctrl');
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
 * User products route
 * @name get/user/products
 * @function
 * @memberof module:routes/userRoutes
 * @inner
 * @param {object} req - HTTP request object
 * @param {object} res - HTTP response object
 */
userRoutes.get('/user/products', getProducts);

/**
 * Retrieves the user's cart.
 * @route GET /user/get/cart
 * @access Private
 * @middleware verifyToken - Authenticates user token
*/
userRoutes.get('/user/get/cart', [verifyToken], getCart);

/**
 * Adds a product to the user's cart.
 * @route POST /user/add/cart
 * @access Private
 * @middleware verifyToken - Authenticates user token
*/
userRoutes.post('/user/add/cart', [verifyToken], addToCart);

/**
 * Updates a product in the user's cart.
 * @route PATCH /user/update/cart/:productId
 * @access Private
 * @middleware verifyToken - Authenticates user token
*/
userRoutes.patch('/user/update/cart/:productId', [verifyToken], updateCart);

/**
 * Removes a product from the user's cart.
 * @route DELETE /user/remove/cart/:productId
 * @access Private
 * @middleware verifyToken - Authenticates user token
*/
userRoutes.delete('/user/remove/cart/:productId', [verifyToken], removeFromCart);

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

/**
 * Route to get orders of a user
 * @route GET /user/orders
 * @param {string} token.headers.required - JWT token for authentication
 * @returns {Array<Object>} Array of user orders
 * @throws {401} If the token is invalid
 * @throws {404} If the user orders are not found
 * @throws {500} If there is a server error
*/
userRoutes.get('/user/orders', [verifyToken], getOrders);

module.exports = userRoutes;
