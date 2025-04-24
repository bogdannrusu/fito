/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import axios from 'axios';
import Navbar from '../CRM/Navbar';
import Cookies from 'js-cookie';
import { apiUrls } from '../../../../../services/api';

const RolesComponent = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Folosim URL-ul API din serviciul centralizat
  const API_URL = apiUrls.CURRENT_API_URL;

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
      const token = Cookies.get('token');
      const response = await axios.get(`${API_URL}/api/roles`, {
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
