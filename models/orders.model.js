/**
 * Represents an order in the system
 * @typedef {Object} Order
 * @property {Date} orderDate - The date when the order was placed
 * @property {string} customerName - The name of the customer who placed the order
 * @property {string} customerEmail - The email of the customer who placed the order
 * @property {Array.<mongoose.Schema.Types.ObjectId>} products - The products that the customer ordered
 * @property {number} totalPrice - The total price of the order
 */

const mongoose = require('mongoose');

/**
 * @typedef {import('mongoose').Schema} Schema
 */

/**
 * Order schema for Mongoose
 * @type {Schema}
 */
const orderSchema = new mongoose.Schema({
    /**
     * The date when the order was placed
     * @type {Date}
     * @default Date.now
     */
    orderDate: {
        type: Date,
        default: Date.now,
    },
    /**
     * The name of the customer who placed the order
     * @type {string}
     * @required
     */
    customerName: {
        type: String,
        required: true,
    },
    /**
     * The email of the customer who placed the order
     * @type {string}
     * @required
     * @lowercase
     */
    customerEmail: {
        type: String,
        required: true,
        lowercase: true,
    },
    /**
     * The products that the customer ordered
     * @type {Array.<mongoose.Schema.Types.ObjectId>}
     * @ref 'Product'
     */
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    /**
     * The total price of the order
     * @type {number}
     * @required
     */
    totalPrice: {
        type: Number,
        required: true,
    },
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
