/**
 * Checkout the user's cart and create a new order.
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The request body.
 * @param {Array} req.body.items - The array of items in the cart.
 * @param {Number} req.body.total - The total cost of the items in the cart.
 * @param {Object} req.user - The authenticated user object.
 * @param {string} req.user._id - The ID of the authenticated user.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} - The created order object.
 */
const checkout = async (req, res) => {
    try {
        const { items, total } = req.body;

        // Check if items and total are present in the request body
        if (!items || !total) {
            return res.status(400).json({ message: 'Please provide items and total.' });
        }

        // Create a new order
        const order = new OrderModel({
            user: req.user._id,
            items,
            total,
            date: new Date(),
            status: 'pending'
        });

        await order.save();

        // Clear the user's cart
        const cart = await CartModel.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        cart.items = [];
        await cart.save();

        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = checkout;
