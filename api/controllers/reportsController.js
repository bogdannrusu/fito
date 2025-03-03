const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/orders');
const Goods = require('../models/goods');

const router = express.Router();

const getReport = async (req, res) => {
    try {
      const goods = await Goods.find();
      const orders = await Order.find();
    
      const reportData = goods.map(good => {
        const relatedOrders = orders.filter(order => 
          order.items.some(item => item.productId.equals(good._id))
        );
      
        const totalSold = relatedOrders.reduce((sum, order) => {
          const item = order.items.find(i => i.productId.equals(good._id));
          return sum + (item ? item.quantity : 0);
        }, 0);
      
        return {
          good_name: good.good_name,
          good_price: good.good_price,
          total_sold: totalSold,
          total_revenue: totalSold * good.good_price
        };
      });

      res.json(reportData);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getReport
};