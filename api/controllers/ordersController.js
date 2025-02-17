/* eslint-disable prettier/prettier */
const Order = require('../models/orders');

// Obține toate comenzile
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};



const fetchOrdersWithGoods = async (req, res) => {
  try {
    const orders = await Order.aggregate([
      { $unwind: "$items" }, // Decompozăm array-ul de items
      {
        $lookup: {
          from: "goods", // Colectăm datele din colecția Goods
          localField: "items.productId", // Câmpul din Orders care face referință la Goods
          foreignField: "_id", // Câmpul din Goods pe care îl conectăm
          as: "productDetails", // Numele câmpului în care stocăm rezultatul
        },
      },
      { $unwind: "$productDetails" }, // Decompozăm array-ul de productDetails
      {
        $group: {
          _id: "$_id",
          orderId: { $first: "$orderId" },
          totalAmount: { $first: "$totalAmount" },
          status: { $first: "$status" },
          items: {
            $push: {
              productId: "$items.productId",
              quantity: "$items.quantity",
              price: "$items.price",
              subtotal: "$items.subtotal",
              productName: "$productDetails.good_name", // Adăugăm numele produsului
            },
          },
        },
      },
    ]);

    res.status(200).json(orders);
  } catch (error) {
    console.error("Failed to fetch orders with goods:", error);
    res.status(500).json({ message: "Failed to fetch orders with goods", error });
  }
};

const createFrontOrder = async (req, res) => {
  try {
    const { orderId, items, totalAmount, name, address, phone } = req.body;

    if (!name || !address || !phone) {
      return res.status(400).json({ message: "Name, address, and phone are required." });
    }

    const newOrder = new Order({
      orderId,
      items,
      totalAmount,
      status: "Pending",
      orderDate: new Date(),
      name,
      address,
      phone,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order", error });
  }
};




// Creează o nouă comandă
const createOrder = async (req, res) => {
  try {
    const { orderId, items, totalAmount } = req.body;

    console.log("Request body:", req.body);  // Logăm datele trimise

    // Creăm o nouă comandă
    const newOrder = new Order({
      orderId,
      items,
      totalAmount,
      status: 'Pending',
      orderDate: new Date(),
      shippingAddress: {
        street: '', 
        city: ''
      },
      paymentMethod: 'Cash',
      paymentStatus: 'Pending',
      shippingMethod: 'Standard',
      trackingNumber: '',
    });

    // Salvăm comanda în baza de date
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);  // Logăm eroarea
    res.status(500).json({ message: 'Failed to create order', error });
  }
};


// Funcția de ștergere a unei comenzi
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Failed to delete order', error });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  fetchOrdersWithGoods,
  deleteOrder,
  createFrontOrder
};
