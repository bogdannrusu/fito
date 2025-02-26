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
const contragentsRoutes = require('./routes/contragentsRoute');
const depositRoutes = require('./routes/depositRoute');
const ordersRoutes = require('./routes/ordersRoute');
const orderDepositRoute = require('./routes/orderDepositRoute');
const unitsRoutes = require('./routes/unitsRoute');

const dbUri = process.env.MONGODB_URI;

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' http://localhost:4000"
  );
  next();
});

mongoose.connect(dbUri, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.use(express.json());

//Testarea in production
app.get('/', (req, res) => {
  res.send('Server is running on port 4000 - great job!');
});

app.use('/api/goods', goodsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workpoints', wpRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/contragents', contragentsRoutes);
app.use('/api/deposits', depositRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/orderDeposit', orderDepositRoute);
app.use('/api/units', unitsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!'); 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
