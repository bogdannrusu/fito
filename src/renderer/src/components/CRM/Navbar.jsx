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
  UserOutlined,
  RedditOutlined,
  DollarOutlined,
  BarChartOutlined,
  TwitterOutlined,
  QqOutlined
} from '@ant-design/icons';
import { Button, Menu, Modal, Dropdown, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
    if (e.key === '9') {
      navigate('/dashboard');
    } else if (e.key === 'sub5') {
      showModal();
    } else if(e.key === '2') {
      navigate('/invoices');
    } else if(e.key === 'sub2') {
      navigate('/s');
    } else if(e.key === 'sub4') {
      navigate('/s');
    }
    // Additional conditions can be added here as needed
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <Button type="link" onClick={() => navigate('/profile')}>{t('profile')}</Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button type="link" onClick={handleOk}>{t('logout')}</Button>
      </Menu.Item>
    </Menu>
  );

  const items = [
    {
      key: 'sub1',
      icon: <FileDoneOutlined />,
      label: t('CRM'),
      children: [
        {
          key: '1-1',
          label: t('Orders'),
          type: 'group',
          children: [
            {
              key: '1',
              icon: <OrderedListOutlined />,
              label: t('Orders View'),
            },
            {
              key: '2',
              icon: <SnippetsOutlined />,
              label: t('Invoices View'),
            },
            {
              key: '3',
              icon: <SolutionOutlined />,
              label: t('Contragents'),
            },
            {
              key: '4',
              icon: <FontSizeOutlined />,
              label: t('Units'),
            },
          ],
        },
        {
          key: '1-2',
          label: t('Reports'),
          type: 'group',
          children: [
            {
              key: '3',
              icon: <LineChartOutlined />,
              label: t('Orders Invoice View'),
            },
            {
              key: '4',
              icon: <TableOutlined />,
              label: t('Invoice Report View'),
            },
          ],
        },
      ],
    },
    {
      key: 'sub2',
      icon: <AppstoreOutlined />,
      label: t('Workspace'),
      children: [
        {
          key: '5-1',
          label: t('Deposits'),
          type: 'group',
          //icon: <OrderedListOutlined />
        },
        {
          key: '5',
          label: t('Deposit Sales'),
          icon: <EuroOutlined />
        },
        {
          key: '6',
          label: t('Deposit Invoices'),
          icon: <DollarOutlined />
        },
        {
          key: 'sub3',
          label: t('Sales'),
          icon: <BarChartOutlined />,
          children: [
            {
              key: '7',
              label: t('Sale To Wp'),
              icon: <TwitterOutlined />
            },
            {
              key: '8',
              label: t('Sale to client'),
              icon: <QqOutlined />
            },
          ],
        },
      ],
    },
    {
      key: 'sub4',
      label: t('Settings'),
      icon: <SettingOutlined />,
      children: [
        {
          key: '9',
          label: t('Users'),
          icon: <UserOutlined />
        },
        {
          key: '10',
          label: t('Roles'),
          icon: <RedditOutlined />
        },
      ],
    },
    {
      key: 'sub5',
      label: t('Logout'),
      icon: <LogoutOutlined />,
    }
  ];

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
        title={t('Logout Confirmation')}
        open={ isModalVisible }
        onOk={ handleOk }
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t('Cancel')}
          </Button>,
          <Button danger key="submit" type="primary" onClick={handleOk}>
            {t('Logout')}
          </Button>,
        ]}
      >
        <p>{t('Are you sure you want to log out?')}</p>
      </Modal>
    </div>
  );
};

export default Navbar;
