/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import { Table, Button, Space, Modal, Form, Input, InputNumber, message } from 'antd'
import axios from 'axios'
import Navbar from './Navbar'

const Goods = () => {
  const [goods, setGoods] = useState([])
  const [loading, setLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

    const API_URL = process.env.NODE_ENV === 'production' 
      ? 'https://fito-api.vercel.app/api'
      : 'http://localhost:4000/api';

    const columns = [
      {
        title: '#',
        key: 'index',
        render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
        width: 60
      },
      {
        title: 'Name',
        dataIndex: 'good_name',
        key: 'good_name'
      },
      {
        title: 'Description',
        dataIndex: 'good_description',
        key: 'good_description'
      },
      {
        title: 'Price',
        dataIndex: 'good_price',
        key: 'good_price'
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'category'
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <Space>
            <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
            <Button danger onClick={() => handleDelete(record._id)}>Delete</Button>
          </Space>
        )
      }
    ]

    const handleTableChange = (newPagination) => {
      setPagination(newPagination);
    };
    useEffect(() => {
      fetchGoods()
    }, [])

    const fetchGoods = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${API_URL}/goods`)
        setGoods(response.data)
      } catch (error) {
        message.error('Failed to fetch goods')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    const handleEdit = (record) => {
      form.setFieldsValue(record)
      setIsModalVisible(true)
    }

    const handleDelete = async (id) => {
      try {
        await axios.delete(`${API_URL}/goods/${id}`)
        message.success('Product deleted successfully')
        fetchGoods()
      } catch (error) {
        message.error('Failed to delete good')
        console.error(error)
      }
    }

    const handleSubmit = async (values) => {
      try {
        if (values.id) {
          await axios.put(`${API_URL}/goods/${values.id}`, values)
        } else {
          await axios.post(`${API_URL}/goods`, values)
        }
        message.success('Good saved successfully')
        setIsModalVisible(false)
        form.resetFields()
        fetchGoods()
      } catch (error) {
        message.error('Failed to save good')
        console.error(error)
      }
    }
  return (
    <>
    <Navbar />
    <div>
      <Button 
        type="primary" 
        style={{ marginBottom: 16, marginTop: 20 }}
        onClick={() => {
          form.resetFields()
          setIsModalVisible(true)
        }}
      >
        Add New Good
      </Button>

      <Table
        columns={columns}
        dataSource={goods}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={form.getFieldValue('id') ? 'Edit Good' : 'Add New Good'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
            <Form.Item
             name="good_name"
             label="Name"
             rules={[{ required: true }]}
            >
            <Input />
        </Form.Item>
        <Form.Item
        name="good_description"
        label="Description"
        >
        <Input />
        </Form.Item>
        <Form.Item
        name="good_price"
        label="Price"
        rules={[{ required: true }]}
        >
        <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true }]}
        >
        <Input />
        </Form.Item>
        </Form>
      </Modal>
    </div>
    </>
    
  )
}

export default Goods
