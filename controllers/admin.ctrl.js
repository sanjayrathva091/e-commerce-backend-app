const ProductModel = require("../models/products.model");

/**
 * Add a new product to the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with the HTTP response.
*/

const addProduct = async (req, res) => {
    try {
        const { name, image, description, brand, category, price, countInStock } = req.body;
        const product = new ProductModel({
            name,
            image,
            description,
            brand,
            category,
            price,
            countInStock
        });
        const newProduct = await product.save();

        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(error => error.message);
            res.status(400).json({ message: messages.join(', ') });
        } else {
            res.status(500).json({ message: 'Server error' });
        }
    }
};

/**
 * Get products with filters and pagination
 *
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 * @returns {Object} The JSON response with product information
 */

const getProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const sort = req.query.sort || 'name';
    const order = req.query.order === 'desc' ? -1 : 1;
    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || 1000000;

    try {
        const products = await ProductModel.find({
            name: { $regex: search, $options: 'i' },
            price: { $gte: minPrice, $lte: maxPrice },
        })
            .sort({ [sort]: order })
            .skip(skip)
            .limit(limit);

        const count = await ProductModel.countDocuments({
            name: { $regex: search, $options: 'i' },
            price: { $gte: minPrice, $lte: maxPrice },
        });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.json({
            count,
            page,
            limit,
            totalPages: Math.ceil(count / limit),
            products,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Get a single product by ID.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<void>}
 */

const getOneProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


/**
 * Update a product.
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The updated product.
 * @throws {Object} The error message and status code.
 */
const updateProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.image = req.body.image || product.image;
        product.price = req.body.price || product.price;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Delete a product by ID.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} - A JSON response with a message.
 */
const deleteProduct = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.remove();
        res.json({ message: 'Product removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getProducts, getOneProduct, addProduct, updateProduct, deleteProduct };