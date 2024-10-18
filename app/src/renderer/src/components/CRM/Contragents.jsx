/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';
import Navbar from './Navbar';
import { useTranslation } from 'react-i18next';
import '../../assets/main.css';

const Contragents = () => {
  const [contragents, setContragents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchContragents();
  }, []);

  const fetchContragents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/contragents');
      if (response && response.status === 200) {
        setContragents(response.data);
      } else {
        message.error('Failed to fetch contragents');
      }
    } catch (error) {
      // Enhanced error logging
      console.error('Error fetching contragents:', error.message || error);
      message.error('Error fetching contragents');
    }
  };
  
  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        if (editingId) {
          await axios.put(`http://localhost:4000/api/contragents/${editingId}`, values);
          message.success('Contragent updated successfully');
        } else {
          await axios.post('http://localhost:4000/api/contragents', values);
          message.success('Contragent added successfully');
        }
        setIsModalVisible(false);
        fetchContragents();
      } catch (error) {
        // Enhanced error logging
        console.error('Error updating or adding contragent:', error.message || error);
        message.error('Operation failed');
      }
    });
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/contragents/${id}`);
      message.success('Contragent deleted successfully');
      fetchContragents();
    } catch (error) {
      // Enhanced error logging
      console.error('Error deleting contragent:', error.message || error);
      message.error('Failed to delete contragent');
    }
  };
  
  
  
  

  const showModal = (record = null) => {
    setIsModalVisible(true);
    setEditingId(record ? record.id : null);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)}>
            {t('Edit')}
          </Button>
          <Button onClick={() => handleDelete(record.id)} danger>
            {t('Delete')}
            </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      
        <Navbar />
        <div className="custom-spacing">
      <Button onClick={() => showModal()} type="primary" style={{ marginBottom: 16 }}>
        {t('Add Contragent')}
      </Button>
      </div>
      <Table columns={columns} dataSource={contragents} rowKey="id" />
      <Modal
        title={editingId ? t("Edit Contragent") : t("Add Contragent")}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: t('Please input the name!') }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: t('Please input the email!') },
              { type: 'email', message: t('Please enter a valid email!') }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: t('Please input the phone number!') }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Contragents;
