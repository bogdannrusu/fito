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
      const response = await axios.get('http://localhost:4000/api/orders/ordergoods', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(response.data);
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
      await axios.delete(`http://localhost:4000/api/orders/${orderId}`, {
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
      const response = await axios.get('http://localhost:4000/api/goods', {
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
  };

  // Functie pentru a trimite datele corecte catre backend
  const handleOk = async () => {
    const token = getToken();
  
    if (!token) {
      message.error('You are not authenticated. Please log in.');
      return;
    }
  
    try {
      const values = await form.validateFields();
      console.log('Form values:', values);
  
      // Asigură-te că trimitem datele într-un format corect
      const items = values.items.map(productId => {
        const selectedProduct = goods.find(good => good._id === productId);
        return {
          productId,  // ID-ul produsului
          quantity: 1,  // Presupunem că cantitatea este 1 (poate fi personalizată)
          price: selectedProduct.good_price,  // Prețul produsului
          subtotal: selectedProduct.good_price * 1,  // Prețul * cantitatea
        };
      });
  
      const newOrder = {
        orderId: values.orderId,
        items,  // Adăugăm lista de produse
        totalAmount: items.reduce((total, item) => total + item.subtotal, 0),  // Calculăm totalul
      };
  
      await axios.post('http://localhost:4000/api/orders', newOrder, {
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
      await axios.post('http://localhost:4000/api/orderDeposit/move', {
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
            <Select mode="multiple" placeholder="Select items">
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
            rules={[{ required: true, message: 'Please input the total amount' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Orders;
