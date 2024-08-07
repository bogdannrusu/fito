/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import { Table, Space, Button, message } from 'antd'
import axios from 'axios'

const Invoices = () => {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('/api/invoices')
      setInvoices(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching invoices:', error)
      message.error('Failed to fetch invoices')
      setLoading(false)
    }
  }

  const columns = [
    {
      title: 'Invoice Number',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">View</Button>
          <Button>Edit</Button>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <h1>Invoices</h1>
      <Table
        columns={columns}
        dataSource={invoices}
        loading={loading}
        rowKey="_id"
      />
    </div>
  )
}

export default Invoices
