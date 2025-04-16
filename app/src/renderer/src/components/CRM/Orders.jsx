/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Card, Table, Tag, Space, Button, message, Modal, Form, Input, Select, Popconfirm } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons'; 
import Navbar from './Navbar';
import axios from 'axios';

const { Option } = Select;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [totalAmount, setTotalAmount] = useState(0);

  const WEB_API_URL = 'https://fito-api.vercel.app';
  const LOCAL_API_URL = 'http://localhost:4000';

  const getToken = () => {
    return localStorage.getItem('token'); 
  };

  const fetchOrders = async () => {
    const token = getToken();

    if (!token) {
      message.error('You are not authenticated. Please log in.');
      return;
    }

    try {
      const response = await axios.get(`${WEB_API_URL}/api/orders/ordergoods`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const sortedOrders = response.data.sort((a, b) => {
        if (a.status === 'Pending' && b.status === 'Completed') return -1;
        if (a.status === 'Completed' && b.status === 'Pending') return 1;
        return 0;
      });

      setOrders(sortedOrders);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      message.error('Failed to fetch orders');
      setLoading(false);
    }
  };

  const deleteOrder = async (orderId) => {
    const token = getToken();

    if (!token) {
      message.error('You are not authenticated. Please log in.');
      return;
    }
    try {
      await axios.delete(`${WEB_API_URL}/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(orders.filter(order => order._id !== orderId));
      message.success('Order deleted successfully!');
    } catch (error) {
      console.error('Error deleting order:', error);
      message.error('Failed to delete order');
    }
  };

  const fetchGoods = async () => {
    const token = getToken();

    if (!token) {
      message.error('You are not authenticated. Please log in.');
      return;
    }

    try {
      const response = await axios.get(`${WEB_API_URL}/api/goods`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setGoods(response.data);
    } catch (error) {
      console.error('Error fetching goods:', error);
      message.error('Failed to fetch goods');
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchGoods();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setTotalAmount(0); // Resetăm suma totală
  };

  const handleOk = async () => {
    const token = getToken();

    if (!token) {
      message.error('You are not authenticated. Please log in.');
      return;
    }

    try {
      const values = await form.validateFields();
      console.log('Form values:', values);

      const items = values.items.map(productId => {
        const selectedProduct = goods.find(good => good._id === productId);
        return {
          productId,
          quantity: 1,
          price: selectedProduct.good_price,
          subtotal: selectedProduct.good_price * 1,
        };
      });

      const newOrder = {
        orderId: values.orderId,
        items,
        totalAmount: items.reduce((total, item) => total + item.subtotal, 0),
        name: values.name,
        address: values.address,
        phone: values.phone,
      };

      await axios.post(`${WEB_API_URL}/api/orders/order`, newOrder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      message.success('Order created successfully!');
      setIsModalVisible(false);
      form.resetFields();
      fetchOrders();
    } catch (error) {
      console.error('Failed to create order:', error);
      message.error('Failed to create order');
    }
  };

  const handleOrderFromDeposit = async (order) => {
    const token = getToken();

    if (!token) {
      message.error('You are not authenticated. Please log in.');
      return;
    }

    try {
      await axios.post(`${WEB_API_URL}/api/orderDeposit/move`, {
        orderId: order.orderId,
        items: order.items,
        totalAmount: order.totalAmount
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      message.success(`Order ID ${order.orderId} moved to deposit and marked as Completed!`);
      fetchOrders();
    } catch (error) {
      console.error('Failed to move order to deposit:', error);
      message.error('Failed to move order to deposit');
    }
  };

  const handleItemsChange = (selectedItems) => {
    const total = selectedItems.reduce((sum, productId) => {
      const selectedProduct = goods.find(good => good._id === productId);
      return sum + (selectedProduct ? selectedProduct.good_price : 0);
    }, 0);
    setTotalAmount(total);
  };

  return (
    <>
      <Navbar />
      <Card
        title="Order Goods from Deposit"
        extra={<Button type="primary" onClick={showModal}>New Order</Button>}
      >
        <Table
          columns={[
            {
              title: 'Order ID',
              dataIndex: 'orderId',
              key: 'orderId',
            },
            {
              title: 'Product',
              dataIndex: 'items',
              key: 'product',
              render: (items) =>
                items.map((item) => item.productName || 'Unknown Product').join(', '),
            },
            {
              title: 'Quantity',
              dataIndex: 'items',
              key: 'quantity',
              render: (items) => items.map((item) => item.quantity).join(', '),
            },
            {
              title: 'Total Price',
              dataIndex: 'totalAmount',
              key: 'totalAmount',
              render: (totalAmount) => `$${totalAmount.toFixed(2)}`,
            },
            {
              title: 'Status',
              key: 'status',
              dataIndex: 'status',
              render: (status) => (
                <Tag color={status === 'Completed' ? 'green' : 'orange'}>
                  {status}
                </Tag>
              ),
            },
            {
              title: 'Action',
              key: 'action',
              render: (_, record) => (
                <Space size="middle">
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => handleOrderFromDeposit(record)}
                    disabled={record.status === 'Completed'}
                  >
                    Order from Deposit
                  </Button>
                  <Popconfirm
                    title="Are you sure you want to delete this order?"
                    onConfirm={() => deleteOrder(record._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      disabled={record.status === 'Completed'}
                    >
                      Delete
                    </Button>
                  </Popconfirm>
                </Space>
              ),
            },
          ]}
          dataSource={orders.map((order, index) => ({
            ...order,
            key: index,
          }))}
          loading={loading}
        />
      </Card>

      <Modal
        title="Create New Order"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="orderId"
            label="Order ID"
            rules={[{ required: true, message: 'Please input the order ID' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="items"
            label="Items"
            rules={[{ required: true, message: 'Please select at least one item' }]}
          >
            <Select mode="multiple" placeholder="Select items" onChange={handleItemsChange}>
              {goods.map((good) => (
                <Option key={good._id} value={good._id}>
                  {good.good_name} - ${good.good_price}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="totalAmount"
            label="Total Amount"
          >
            <Input type="number" value={totalAmount} readOnly />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please input the address' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please input the phone number' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Orders;
