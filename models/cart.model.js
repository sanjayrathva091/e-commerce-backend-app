const mongoose = require('mongoose');

/**
 * Cart schema
 * @typedef {Object} CartSchema
 * @property {mongoose.Schema.Types.ObjectId} user - The ID of the user the cart belongs to.
 * @property {Array} products - The array of products in the cart.
 * @property {Object} products.product - The ID of the product.
 * @property {Number} products.quantity - The quantity of the product in the cart.
 * @property {Date} created_at - The date the cart was created.
 * @property {Date} updated_at - The date the cart was last updated.
 */

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        },
    ],
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

/**
 * Cart model
 * @typedef {Object} CartModel
 * @property {mongoose.Model<CartSchema>} cart - The Cart model.
 */

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
