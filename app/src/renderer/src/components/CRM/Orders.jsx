/* eslint-disable prettier/prettier */
import React from 'react'
import { Card, Table, Tag, Space, Button } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import Navbar from './Navbar'
import axios from 'axios'


const fetchOrders = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/orders')
    return response.data
  } catch (error) {
    console.error('Error fetching orders:', error)
    return []
  }
}


const Orders = () => {
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => `$${price.toFixed(2)}`,
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
          <Button type="primary" icon={<ShoppingCartOutlined />}>
            Order from Deposit
          </Button>
        </Space>
      ),
    },
  ]

  const data = [
    {
      key: 1,
      id: 'ORD001',
      product: 'Widget A',
      quantity: 5,
      totalPrice: 250.00,
      status: 'Pending',
    },
    {
      key: 2,
      id: 'ORD002',
      product: 'Gadget B',
      quantity: 2,
      totalPrice: 150.00,
      status: 'Completed',
    },
    {
      key: 3,
      id: 'ORD003',
      product: 'Tool C',
      quantity: 1,
      totalPrice: 75.00,
      status: 'Pending',
    },
  ]

  return (
    <>
    <Navbar />
       <Card title="Order Goods from Deposit" extra={ <Button type="primary">New Order</Button> } >
      <Table columns={columns} dataSource={data} />
    </Card>
    </>
 
  )
}

export default Orders
