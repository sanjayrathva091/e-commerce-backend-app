require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const connectDB = require('./configs/db.config');

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/api', userRoutes);

// listen
app.listen(PORT, function () {
    connectDB();
    console.log(`listening on ${PORT}`);
});