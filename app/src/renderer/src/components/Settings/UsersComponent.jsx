/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Table, Space, Button, message, Modal, Form, Select, Switch } from 'antd';
import axios from 'axios';
import Navbar from '../CRM/Navbar';
import Cookies from 'js-cookie';
import { apiUrls } from '../../../../../services/api';

const { Option } = Select;

// Folosim URL-ul API din serviciul centralizat
const API_URL = apiUrls.CURRENT_API_URL;

const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: 'User ID',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Is Active',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (is_active) => (is_active ? 'Active' : 'Inactive'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showEditModal(record)}>Edit</Button>
          <Button danger onClick={() => showDeleteModal(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const getToken = () => Cookies.get('token');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const response = await axios.get(`${API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      message.error('Failed to fetch users');
    }
    setLoading(false);
  };

  const showEditModal = (user) => {
    setSelectedUser(user);
    form.setFieldsValue({
      role: user.role,
      is_active: user.is_active,
    });
    setIsEditModalVisible(true);
  };

  const handleEdit = async () => {
    try {
      const values = await form.validateFields();
      const token = getToken();
      await axios.put(
        `${API_URL}/api/users/${selectedUser._id}`, 
        values,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      message.success('User updated successfully');
      fetchUsers();
      setIsEditModalVisible(false);
      setSelectedUser(null);
    } catch (error) {
      message.error('Failed to update user');
    }
  };

  const showDeleteModal = (user) => {
    setSelectedUser(user);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      const token = getToken();
      await axios.delete(
        `${API_URL}/api/users/${selectedUser._id}`,
        { headers: { Authorization: `Bearer ${token}` }}
      );
      message.success('User deleted successfully');
      fetchUsers();
      setIsDeleteModalVisible(false);
      setSelectedUser(null);
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const handleCancel = () => {
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Navbar />
      <div>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="_id"
          loading={loading}
        />
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit User"
        open={isEditModalVisible}
        onOk={handleEdit}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            role: '',
            is_active: false,
          }}
        >
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select>
              <Option value="admin">Admin</Option>
              <Option value="user_invoice">User Invoice</Option>
              <Option value="user_sales">User Sales</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="is_active"
            label="Active Status"
            valuePropName="checked"
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        title="Confirm Delete"
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Delete"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </>
  );

};


export default UsersComponent;
