/**

@module ProductModel
@description Defines the product schema for MongoDB and exports the ProductModel model
*/
const mongoose = require('mongoose');

/**

@typedef ProductSchema
@property {string} name - Product name (required)
@property {string} description - Product description (required)
@property {string} category - Product category (required, enum: ['Blender', 'Toaster', 'Coffee Maker', 'Food Processor', 'Juicer', 'Mixer'], default: 'Blender')
@property {number} price - Product price (required, min: 0)
@property {string} image - Product image (required)
@property {Array<Object>} ratings - Array of rating objects with user, rating and review properties
@property {number} numReviews - Number of reviews for the product
@property {string} brand - Product brand (required)
@property {number} countInStock - Number of products in stock (required, min: 0, max: 100)
@property {Date} createdAt - Timestamp when the product was created
@property {Date} updatedAt - Timestamp when the product was last updated
*/
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxLength: 1000
    },
    category: {
        type: String,
        required: true,
        enum: ['Blender', 'Toaster', 'Coffee Maker', 'Food Processor', 'Juicer', 'Mixer'],
        default: 'Blender'
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
        required: true
    },
    ratings: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            },
            review: {
                type: String,
                required: true,
                maxLength: 1000
            }
        }
    ],
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    brand: {
        type: String,
        required: true,
        maxLength: 100
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
}, {
    timestamps: true
});

/**

Product model
@typedef ProductModel
@type {object}
@property {ProductSchema} schema - Product schema
*/
const ProductModel = mongoose.model('Product', productSchema);
module.exports = ProductModel;