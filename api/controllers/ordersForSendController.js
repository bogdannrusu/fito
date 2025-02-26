const OrderForSend = require('../models/ordersForSend');

const getAllOrdersForSend = async (req, res) => {
  try {
    const orders = await OrderForSend.find().populate('items.productId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders for send', error });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await OrderForSend.findOneAndUpdate(
      { orderId },
      { status: 'Completed' },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status', error });
  }
};

module.exports = {
  getAllOrdersForSend,
  updateOrderStatus,
};