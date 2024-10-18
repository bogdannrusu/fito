/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';
import Navbar from './Navbar';

const Units = () => {
  const [units, setUnits] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingUnit, setEditingUnit] = useState(null);

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/units');
      setUnits(response.data);
    } catch (error) {
      console.error('Error fetching units:', error);
      message.error('Failed to fetch units');
    }
  };

  const showModal = (unit = null) => {
    setEditingUnit(unit);
    setIsModalVisible(true);
    if (unit) {
      form.setFieldsValue(unit);
    } else {
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUnit(null);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      if (editingUnit) {
        await axios.put(`http://localhost:3000/api/units/${editingUnit._id}`, values);
        message.success('Unit updated successfully');
      } else {
        await axios.post('http://localhost:3000/api/units', values);
        message.success('Unit added successfully');
      }
      setIsModalVisible(false);
      fetchUnits();
    } catch (error) {
      console.error('Error saving unit:', error);
      message.error('Failed to save unit');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/units/${id}`);
      message.success('Unit deleted successfully');
      fetchUnits();
    } catch (error) {
      console.error('Error deleting unit:', error);
      message.error('Failed to delete unit');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record._id)} danger>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <>
    <Navbar />
     <div>
      <Button onClick={() => showModal()} type="primary" style={{ marginBottom: 16, marginTop: 16 }}>
        Add Unit
      </Button>
      <Table columns={columns} dataSource={units} rowKey="_id" />
      <Modal
        title={editingUnit ? 'Edit Unit' : 'Add Unit'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the unit name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="symbol"
            label="Symbol"
            rules={[{ required: true, message: 'Please input the unit symbol!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingUnit ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
    </>
   
  );
};

export default Units;
