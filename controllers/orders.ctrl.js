/**
 * Get a list of orders that match the given criteria.
 * @async
 * @function
 * @param {Object} req - The request object.
 * @param {number} [req.query.page=1] - The current page number to display.
 * @param {number} [req.query.limit=10] - The maximum number of items to display per page.
 * @param {string} [req.query.search=''] - The string to match customer names against.
 * @param {string} [req.query.sort='orderDate'] - The field to sort by.
 * @param {string} [req.query.order='asc'] - The order to sort the results by.
 * @param {number} [req.query.minTotalPrice=0] - The minimum total price to filter by.
 * @param {number} [req.query.maxTotalPrice=1000000] - The maximum total price to filter by.
 * @param {Object} res - The response object.
 * @returns {Object} - Returns a JSON object containing a list of orders, the total number of orders, the current page, and the total number of pages.
 * @throws {Object} - Throws an error if there is a server error.
 */
const getOrders = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = req.query.search || '';
  const sort = req.query.sort || 'orderDate';
  const order = req.query.order === 'desc' ? -1 : 1;
  const minTotalPrice = parseInt(req.query.minTotalPrice) || 0;
  const maxTotalPrice = parseInt(req.query.maxTotalPrice) || 1000000;

  try {
    const orders = await OrderModel.find({
      customerName: { $regex: search, $options: 'i' },
      totalPrice: { $gte: minTotalPrice, $lte: maxTotalPrice },
    })
      .sort({ [sort]: order })
      .skip(skip)
      .limit(limit)
      .populate('products');

    const count = await OrderModel.countDocuments({
      customerName: { $regex: search, $options: 'i' },
      totalPrice: { $gte: minTotalPrice, $lte: maxTotalPrice },
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.json({
      count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**

Update an order.
@async
@function updateOrder
@param {Object} req - The request object.
@param {Object} res - The response object.
@returns {Object} The updated order.
@throws {Object} 500 - Server error.
@throws {Object} 404 - Order not found.
*/
const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.customerName = req.body.customerName || order.customerName;
    order.customerEmail = req.body.customerEmail || order.customerEmail;
    order.products = req.body.products || order.products;
    order.totalPrice = req.body.totalPrice || order.totalPrice;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getOrders, updateOrder };
