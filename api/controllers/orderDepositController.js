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

    // Creează o nouă intrare în order_deposit pe baza comenzii selectate
    const newOrderDeposit = new OrderDeposit({
      orderId: order.orderId,
      items: orderItems, // Atribuim lista de produse
      totalAmount: order.totalAmount,
      status: 'Completed', // Setăm statusul pe Completed
      depositDate: new Date(),
    });

    // Salvăm comanda în colecția order_deposit
    await newOrderDeposit.save();

    // Actualizează statusul comenzii în colecția Orders la Completed
    order.status = 'Completed';
    await order.save();

    res.status(201).json({ message: 'Order moved to deposit and marked as completed', newOrderDeposit });
  } catch (error) {
    res.status(500).json({ message: 'Failed to move order to deposit', error });
  }
};

module.exports = {
  moveToOrderDeposit
};
