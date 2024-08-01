/* eslint-disable prettier/prettier */
// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors middleware
const goodsRoutes = require('./routes/goodRoute');
const userRoutes = require('./routes/userRoute');
const wpRoutes = require('./routes/workpointsRoute');

const dbUri = process.env.MONGODB_URI;

const app = express();
const port = process.env.PORT;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self'; connect-src 'self' http://localhost:3000");
  next();
});

// Connect to MongoDB
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/goods', goodsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workpoints', wpRoutes);


// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
