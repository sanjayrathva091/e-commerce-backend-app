/**
 * Retrieves user's cart with pagination
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {number} [req.query.page=1] - page number
 * @param {number} [req.query.limit=10] - page size
 * @returns {Object} Returns JSON object containing the cart data and a success flag
*/

const CartModel = require("../models/cart.model");
const ProductModel = require("../models/products.model");

const getCart = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const cart = await CartModel.findOne({ user: req.user.id })
            .populate('products.product', 'name price image')
            .sort({ created_at: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            success: true,
            data: cart,
        });
    } catch (error) {

        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

/**
 * Adds a product to user's cart
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} req.body.productId - product id to add
 * @param {number} req.body.quantity - quantity of the product to add
 * @returns {Object} Returns JSON object containing the cart data
*/

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        const cart = await CartModel.findOne({ user: req.user._id });
        if (!cart) {
            const newCart = new Cart({
                user: req.user._id,
                items: [{ product: productId, quantity }],
            });
            await newCart.save();
            return res.status(201).json(newCart);
        }

        const existingCartItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {

        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

/**
 * Update the quantity of an item in the user's cart
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The updated cart object
 * @throws {Object} 404 error if the cart or item is not found, 500 error if server error occurs
 */
const updateCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await CartModel.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        const existingCartItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (!existingCartItem) {
            return res.status(404).json({ message: 'Item not found in cart.' });
        }

        existingCartItem.quantity = quantity;

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {

        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

/**
 * Remove an item from the user's cart
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Object} The updated cart object
 * @throws {Object} 404 error if the cart is not found, 500 error if server error occurs
 */
const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await CartModel.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        await cart.save();

        res.status(200).json(cart);
    } catch (error) {

        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};


module.exports = { getCart, addToCart, updateCart, removeFromCart };