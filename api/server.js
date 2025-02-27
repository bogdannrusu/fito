/* eslint-disable prettier/prettier */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const goodsRoutes = require('./routes/goodRoute');
const userRoutes = require('./routes/userRoute');
const wpRoutes = require('./routes/workpointsRoute');
const invoiceRoutes = require('./routes/invoiceRoute');
const depositRoutes = require('./routes/depositRoute');
const ordersRoutes = require('./routes/ordersRoute');
const orderDepositRoute = require('./routes/orderDepositRoute');

const app = express();

// Variabile de mediu
const dbUri = process.env.MONGODB_URI;
const port = process.env.PORT || 4000;

// Conexiune cached la MongoDB
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    console.log('Using cached database connection');
    return cachedDb;
  }

  try {
    console.log('Establishing new database connection');
    await mongoose.connect(dbUri, {
      // Opțiunile sunt opționale în versiunile recente de Mongoose, dar le putem păstra dacă ai o versiune mai veche
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedDb = mongoose.connection;
    console.log('Connected to MongoDB');
    return cachedDb;
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
}

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Asigurăm conexiunea înainte de fiecare request
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    res.status(500).send('Database connection failed');
  }
});

// Rute
app.get('/', (req, res) => {
  res.send('Server is running - great job!');
});

app.use('/api/goods', goodsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workpoints', wpRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/deposits', depositRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/orderDeposit', orderDepositRoute);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Pornim serverul doar local (nu e necesar pentru Vercel)
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app;