/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';
import Navbar from '../Navbar';
import { useTranslation } from 'react-i18next';
import ContragentDetails from './ContragentsDetails';
import Contragent from '../../../../../../../api/models/contragents';

const Contragents = () => {
  const [contragents, setContragents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    fetchContragents();
  }, []);

  const handleAddContragent = async () => {
    try {
      const values = await form.validateFields();
      await axios.post('http://localhost:4000/api/contragents', values);
      message.success('Contragent added successfully');
      fetchContragents();
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error adding contragent:', error);
      message.error('Failed to add contragent');
    }
  };

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
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingId(null);
    form.resetFields();
  };  

  const columns = [
    {  title: 'Name', dataIndex: 'name', key: 'name',  },
    {  title: 'Email', dataIndex: 'email', key: 'email', },
    {  title: 'Phone', dataIndex: 'phone', key: 'phone',  },
    {  title: 'Actions', key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={ContragentDetails}>
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
      <Button onClick={ ContragentDetails } type="primary" style={{ marginBottom: 16 }}>
        {t('Add Contragent')}
      </Button>
      </div>
      <Table columns={columns} dataSource={contragents} rowKey="id" />
    </div>
  );
};
export default Contragents;
