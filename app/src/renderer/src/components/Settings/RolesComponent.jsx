/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import axios from 'axios';
import Navbar from '../CRM/Navbar';

const RolesComponent = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Role ID',
      dataIndex: 'role_id',
      key: 'role_id',
    },
    {
      title: 'Role Name',
      dataIndex: 'role_name',
      key: 'role_name',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    }
  ];

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/api/roles', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRoles(response.data);
    } catch (error) {
      message.error('Failed to fetch roles');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h2>Roles Management</h2>
        <Table
          columns={columns}
          dataSource={roles}
          rowKey="role_id"
          loading={loading}
        />
      </div>
    </>
  );
};

export default RolesComponent;
