/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Table, Space, Button, message, Modal } from 'antd';
import axios from 'axios';
import Navbar from '../CRM/Navbar';

const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      message.error('Failed to fetch users');
    }
    setLoading(false);
  };

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
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
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
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button danger onClick={() => showDeleteModal(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (user) => {
    // Implement edit functionality
    console.log('Edit user:', user);
  };

  const showDeleteModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${selectedUser._id}`);
      message.success('User deleted successfully');
      fetchUsers();
      setIsModalVisible(false);
      setSelectedUser(null);
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Navbar />
      <div>
        <h2>Users</h2>
        <Table
          columns={columns}
          dataSource={users}
          rowKey="_id"
          loading={loading}
        />
      </div>
      <Modal
        title="Confirm Delete"
        visible={isModalVisible}
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
