/* eslint-disable prettier/prettier */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const goodsRoutes = require('./routes/goodRoute');
const userRoutes = require('./routes/userRoute');
const wpRoutes = require('./routes/workpointsRoute');
const Counter = require('./models/counterModel');

const dbUri = process.env.MONGODB_URI;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes

// Update Content-Security-Policy to allow localhost connections
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://localhost:5000"
  );
  next();
});

// Connect to MongoDB
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log('Connected to MongoDB');

    // Initialize the counter if it does not exist
    const userCounter = await Counter.findById('user_id');
    if (!userCounter) {
      await new Counter({ _id: 'user_id', seq: 0 }).save();
    }
  })
  .catch((err) => {
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
