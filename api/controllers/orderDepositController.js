/* eslint-disable prettier/prettier */
const OrderDeposit = require('../models/orderDeposit');
const Order = require('../models/orders');

// Mută comanda selectată în colecția order_deposit și actualizează statusul în Completed
const moveToOrderDeposit = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Găsește comanda selectată în colecția Orders
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Verifică dacă comanda este deja completată
    if (order.status === 'Completed') {
      return res.status(400).json({ message: 'Order is already completed' });
    }

    // Prelucrăm toate produsele din comanda originală
    const orderItems = order.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.quantity * item.price
    }));
      const newOrderDeposit = new OrderDeposit({
        orderId: order.orderId,
        items: orderItems,
        totalAmount: order.totalAmount,
        status: 'Completed',
        finalStatus: 'Pending',
        depositDate: new Date(),
    });

    await newOrderDeposit.save();

    order.status = 'Completed';
    await order.save();

    res.status(201).json({ message: 'Order moved to deposit and marked as completed', newOrderDeposit });
  } catch (error) {
    res.status(500).json({ message: 'Failed to move order to deposit', error });
  }
};

  const getAllOrderDeposits = async (req, res) => {
    try {
      const deposits = await OrderDeposit.find()
        .populate('items.productId')
        .sort({ depositDate: -1 });
      res.status(200).json(deposits);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch deposits', error });
    }
  };

  const updateFinalStatus = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { finalStatus } = req.body;
  
      const order = await OrderDeposit.findOneAndUpdate(
        { orderId },
        { finalStatus },
        { new: true }
      );
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json({ message: 'Final status updated successfully', order });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update final status', error });
    }
  };

  module.exports = {
    moveToOrderDeposit,
    getAllOrderDeposits,
    updateFinalStatus
  };


