/**
 * This module defines the main entry point for the application, initializes the necessary configuration,
 * and starts the express server.
 * @module index
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const connectDB = require('./configs/db.config');
const adminRoutes = require('./routes/admin.routes');

const app = express();

const PORT = process.env.PORT || 8000;

// Middleware functions
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', userRoutes);
app.use('/api', adminRoutes);

// Start the server
app.listen(PORT, function () {
    connectDB();
    console.log(`listening on ${PORT}`);
});
