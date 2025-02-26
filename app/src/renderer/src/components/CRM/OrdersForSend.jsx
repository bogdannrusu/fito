/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button, message, Popconfirm } from 'antd';
import axios from 'axios';
import Navbar from './Navbar';

const OrdersForSend = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem('token');

  const fetchOrders = async () => {
    const token = getToken();
    if (!token) {
      message.error('You are not authenticated. Please log in.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:4000/api/orders/ordersend', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      message.error('Failed to fetch orders');
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId) => {
    const token = getToken();
    if (!token) {
      message.error('You are not authenticated. Please log in.');
      return;
    }

    try {
      await axios.put(
        `http://localhost:4000/api/orders/updateorderstatus/${orderId}`, 
        { status: 'Completed' },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      message.success('Order marked as completed successfully!');
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      message.error('Failed to update order status');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Products',
      dataIndex: 'items',
      key: 'items',
      render: (items) => items.map(item => 
        `${item.productId.good_name} (${item.quantity})`
      ).join(', '),
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => `${amount.toFixed(2)} RON`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Pending' ? 'orange' : 'green'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Deposit Date',
      dataIndex: 'depositDate',
      key: 'depositDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {record.status !== 'Completed' && (
            <Popconfirm
              title="Are you sure you want to mark this order as completed?"
              onConfirm={() => updateOrderStatus(record.orderId)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">Mark as Completed</Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <Table
        columns={columns}
        dataSource={orders.map((order) => ({ ...order, key: order._id }))}
        loading={loading}
      />
    </>
  );
};

export default OrdersForSend;