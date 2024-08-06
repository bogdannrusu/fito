/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { 
  AppstoreOutlined, 
  FileDoneOutlined, 
  SettingOutlined,
  OrderedListOutlined,
  SnippetsOutlined,
  LineChartOutlined,
  SolutionOutlined, 
  FontSizeOutlined,
  TableOutlined,
  LogoutOutlined,
  EuroOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Button, Menu, Modal, Dropdown, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const items = [
  {
    key: 'sub1',
    icon: <FileDoneOutlined />,
    label: 'CRM',
    children: [
      {
        key: '1-1',
        label: 'Orders',
        type: 'group',
        children: [
          {
            key: '1',
            icon: <OrderedListOutlined />,
            label: 'Orders View',
          },
          {
            key: '2',
            icon: <SnippetsOutlined />,
            label: 'Invoices View',
          },
          {
            key: '3',
            icon: <SolutionOutlined />,
            label: 'Contragents',
          },
          {
            key: '4',
            icon: <FontSizeOutlined />,
            label: 'Units',
          },
        ],
      },
      {
        key: '1-2',
        label: 'Reports',
        type: 'group',
        children: [
          {
            key: '3',
            icon: <LineChartOutlined />,
            label: 'Orders Invoice View',
          },
          {
            key: '4',
            icon: <TableOutlined />,
            label: 'Invoice Report View',
          },
        ],
      },
    ],
  },
  {
    key: 'sub2',
    icon: <AppstoreOutlined />,
    label: 'Workspace',
    children: [
      {
        key: '5',
        label: 'Deposit Sales',
        icon: <EuroOutlined />
      },
      {
        key: '6',
        label: 'Deposit Invoices',
      },
      {
        key: 'sub3',
        label: 'Sales',
        children: [
          {
            key: '7',
            label: 'SaleToWp',
          },
          {
            key: '8',
            label: 'Direct Sale',
          },
        ],
      },
    ],
  },
  {
    key: 'sub4',
    label: 'Settings',
    icon: <SettingOutlined />,
    children: [
      {
        key: '9',
        label: 'Option 9',
      },
      {
        key: '10',
        label: 'Option 10',
      },
      {
        key: '11',
        label: 'Option 11',
      },
      {
        key: '12',
        label: 'Option 12',
      },
    ],
  },
  {
    key: 'sub5',
    label: 'Logout',
    icon: <LogoutOutlined />,
  }
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://localhost:5000/api/users/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setLoggedInUser(response.data.user);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    };

    fetchUser();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    localStorage.removeItem('token');
    setLoggedInUser(null);
    navigate('/');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleClick = (e) => {
    console.log('click', e);
    if (e.key === '1') {
      navigate('/dashboard');
    } else if (e.key === 'sub5') {
      showModal();
    }
    // Additional conditions can be added here as needed
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <Button type="link" onClick={() => navigate('/profile')}>Profile</Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button type="link" onClick={handleOk}>Logout</Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Menu
        onClick={handleClick}
        mode="horizontal"
        items={items}
      />
      {loggedInUser && (
        <Dropdown overlay={userMenu} style={{ position: 'absolute', top: 0, right: 0 }}>
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        </Dropdown>
      )}
      <Modal
        title="Logout Confirmation"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button danger key="submit" type="primary" onClick={handleOk}>
            Logout
          </Button>,
        ]}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </div>
  );
};

export default Navbar;
