/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button, message, Popconfirm } from 'antd';
import axios from 'axios';
import Navbar from './Navbar';

const OrdersForSend = () => {
  const [orderDeposits, setOrderDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem('token');
  const WEB_API_URL = 'https://fito-api.vercel.app';
  const LOCAL_API_URL = 'http://localhost:4000';

  const fetchOrderDeposits = async () => {
    const token = getToken();
    try {
      const response = await axios.get(`${WEB_API_URL}/api/orderDeposit`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrderDeposits(response.data);
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch order deposits');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDeposits();
  }, []);

  const columns = [
    {
      title: '#',
      key: 'index',
      render: (_, __, index) => index + 1,
      width: 60
    },
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId'
    },
    {
      title: 'Products',
      dataIndex: 'items',
      key: 'items',
      render: (items) => items?.map(item => 
        `${item.productId?.good_name} (${item.quantity}x${item.price})`
      ).join(', ')
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => `${amount?.toFixed(2)} Lei`
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Completed' ? 'green' : 'orange'}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Deposit Date',
      dataIndex: 'depositDate',
      key: 'depositDate',
      render: (date) => new Date(date).toLocaleString()
    },
    {
      title: 'Final Status',
      key: 'finalStatus',
      render: (_, record) => (
        <Space>
          <Tag color={record.finalStatus === 'Delivered' ? 'green' : 'orange'}>
            {record.finalStatus}
          </Tag>
          <Button 
            type="primary" 
            size="small"
            onClick={async () => {
              try {
                const token = getToken();
                await axios.patch(
                  `${WEB_API_URL}/api/orderDeposit/status/${record.orderId}`,
                  { finalStatus: 'Delivered' },
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                message.success('Status updated successfully');
                fetchOrderDeposits();
              } catch (error) {
                message.error('Failed to update status');
              }
            }}
          >
            Mark as Delivered
          </Button>
        </Space>
      )
    }
  ];
  return (    
  <>
      <Navbar />
      <Table
        columns={columns}
        dataSource={orderDeposits.map((order) => ({ ...order, key: order._id }))}
        loading={loading}
      />
  </>
  );
};
export default OrdersForSend;