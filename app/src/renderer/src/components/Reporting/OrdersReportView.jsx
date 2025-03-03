/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Table, Button, message, Card } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import Navbar from '../CRM/Navbar';

const OrdersReportView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem('token');

  const fetchReportData = async () => {
    try {
      const token = getToken();
      const response = await axios.get('http://localhost:4000/api/reports', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch report data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  const columns = [
    { title: 'Product Name', dataIndex: 'good_name', key: 'good_name' },
    { 
      title: 'Price', 
      dataIndex: 'good_price', 
      key: 'good_price',
      render: (price) => `${price.toFixed(2)} Lei`
    },
    { title: 'Total Sold', dataIndex: 'total_sold', key: 'total_sold' },
    { 
      title: 'Total Revenue', 
      dataIndex: 'total_revenue', 
      key: 'total_revenue',
      render: (revenue) => `${revenue.toFixed(2)} Lei`
    }
  ];

  return (
    <>
    <Navbar />
    <div style={{ padding: '20px' }}>
      <h2>📊 Sales Report</h2>
      <Button 
        onClick={fetchReportData} 
        type="primary" 
        style={{ marginBottom: 16 }}
      >
        Refresh Report
      </Button>

      {/* Grafic vânzări pe produs */}
      <Card title="Total Products Sold" style={{ marginBottom: 20 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="good_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_sold" fill="#8884d8" name="Total Sold" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Grafic venituri generate */}
      <Card title="Total Revenue per Product" style={{ marginBottom: 20 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="good_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_revenue" fill="#82ca9d" name="Total Revenue (Lei)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Tabel detaliat */}
      <Table 
        columns={columns} 
        dataSource={data} 
        loading={loading} 
        rowKey="good_name"
        pagination={{ pageSize: 10 }}
      />
    </div>
    </>
    
  );
};

export default OrdersReportView;
