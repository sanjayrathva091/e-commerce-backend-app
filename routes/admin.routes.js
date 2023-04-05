/**
 * Admin routes
 * @module routes/adminRoutes
 */

const express = require('express');

const {
    getProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/admin.ctrl');

const {
    adminLogin,
} = require('../controllers/adminLogin.ctrl');

const authorize = require('../middlewares/authorize');

const {
    getOrders,
    updateOrder,
} = require('../controllers/orders.ctrl');

const adminRoutes = express.Router();

/**
 * Route for admin login
 * @name post/auth/admin/login
 * @function
 * @memberof module:routers/adminRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */

adminRoutes.post('/auth/admin/login', adminLogin);

/**
 * Route for getting all products
 * @name get/admin/products
 * @function
 * @memberof module:routers/adminRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */

adminRoutes.get('/admin/products', getProducts);

/**
 * Route for getting a single product by ID
 * @name get/admin/products/:_id
 * @function
 * @memberof module:routers/adminRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */

adminRoutes.get('/admin/products/:_id', getOneProduct);

/**
 * Route for adding a new product
 * @name post/admin/products
 * @function
 * @memberof module:routers/adminRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */

adminRoutes.post('/admin/products', [authorize], addProduct);

/**
 * Route for updating an existing product by ID
 * @name put/admin/products/:_id
 * @function
 * @memberof module:routers/adminRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */

adminRoutes.put('/admin/products/:_id', [authorize], updateProduct);

/**
 * Route for deleting an existing product by ID
 * @name delete/admin/products/:_id
 * @function
 * @memberof module:routers/adminRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */

adminRoutes.delete('/admin/products/:_id', [authorize], deleteProduct);

/**
 * Route for getting all orders
 * @name get/admin/orders
 * @function
 * @memberof module:routers/adminRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */

adminRoutes.get('/admin/orders', getOrders);

/**
 * Route for updating an existing order by ID
 * @name put/admin/orders/:_id
 * @function
 * @memberof module:routers/adminRoutes
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */

adminRoutes.put('/admin/orders/:_id', updateOrder);

module.exports = adminRoutes;
