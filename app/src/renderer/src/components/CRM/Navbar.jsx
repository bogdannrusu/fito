/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import {
  AppstoreOutlined,
  FileDoneOutlined,
  SettingOutlined,
  OrderedListOutlined,
  SnippetsOutlined,
  LineChartOutlined,
  GoogleOutlined,
  FontSizeOutlined,
  TableOutlined,
  LogoutOutlined,
  EuroOutlined,
  UserOutlined,
  RedditOutlined,
  DollarOutlined,
  BarChartOutlined,
  TwitterOutlined,
  QqOutlined,
  FlagOutlined,
} from '@ant-design/icons';
import { Button, Menu, Modal, message, Popover } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Flag from 'react-flagkit';
import Cookies from 'js-cookie';
import { apiUrls } from '../../../../../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Folosim URL-ul API din serviciul centralizat
  const API_URL = apiUrls.CURRENT_API_URL;

  const routes = {
    '1': '/orders',
    '2': '/orderforsend',
    '3': '/goods',
    '4': '/test',
    '5': '/orderreport',
    '7': '/depositsales',
    '8': '/orderdeposits',
    '20': '/users',
    '15': '/roles',
    'sub5': null,
  };

  useEffect(() => {
    // Debug pentru a verifica cookie-ul
    console.log('Token in Navbar useEffect init:', Cookies.get('token'));

    window.onbeforeunload = () => {
      Cookies.remove('token');
    };

    const token = Cookies.get('token');
    if (!token) {
      console.log('No token found, redirecting to /');
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const token = Cookies.get('token');
      console.log('Token in Navbar fetchUser:', token);

      if (!token) {
        console.log('No token, redirecting to login');
        navigate('/');
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API response for user:', response.data); // Debug detaliat

        // Verificăm structura răspunsului
        if (!response.data.user || !response.data.user.username) {
          throw new Error('Invalid user data structure. Response:', JSON.stringify(response.data));
        }

        const user = response.data.user;
        setLoggedInUser(user);
        setRoles(user.roles || []);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        if (error.response) {
          console.log('Error response:', error.response.data);
          if (error.response.status === 401) {
            message.error(t('Session expired. Please log in again.'));
            Cookies.remove('token');
            setLoggedInUser(null);
            setRoles([]);
            navigate('/');
          } else {
            message.error(t('Failed to load user data'));
          }
        } else {
          message.error(t('Server not responding'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate, t, API_URL]);

  // Forțăm re-renderizarea pentru a verifica starea loggedInUser
  const forceUpdate = () => {
    setLoading(false); // Forțăm o re-renderizare simplă
  };

  useEffect(() => {
    // Forțăm re-renderizarea după ce loggedInUser se actualizează
    if (loggedInUser) {
      forceUpdate();
    }
  }, [loggedInUser]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    if (window.electron && window.electron.closeApp) {
      window.electron.closeApp();
    } else {
      console.error('Electron API not available');
    }
  };

  const handleMinim = () => {
    if (window.electron && window.electron.minimizeApp) {
      window.electron.minimizeApp();
    } else {
      console.error('Electron API not available');
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    Cookies.remove('token');
    Cookies.remove('roles');
    setLoggedInUser(null);
    navigate('/');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLanguageChange = (key) => {
    switch (key) {
      case '12':
        i18n.changeLanguage('en');
        message.success(t('Language changed to English'));
        break;
      case '13':
        i18n.changeLanguage('ru');
        message.success(t('Language changed to Russian'));
        break;
      case '14':
        i18n.changeLanguage('ro');
        message.success(t('Language changed to Romanian'));
        break;
      default:
        break;
    }
  };

  const isAdmin = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) return false;

      const response = await axios.get(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.user.role_id === 1;
    } catch (error) {
      console.error('Error checking admin:', error);
      return false;
    }
  };

  const verifyAdminAndNavigate = async (routeKey) => {
    if (routeKey === '20') {
      const hasAdminRole = await isAdmin();
      if (hasAdminRole) {
        navigate(routes[routeKey]);
      } else {
        message.error('Access Denied: You do not have the required permissions to access this page.');
      }
    } else {
      navigate(routes[routeKey]);
    }
  };

  const handleClick = (e) => {
    try {
      if (['12', '13', '14'].includes(e.key)) {
        handleLanguageChange(e.key);
      } else if (routes[e.key] !== undefined) {
        if (routes[e.key]) {
          verifyAdminAndNavigate(e.key);
        } else if (e.key === 'sub5') {
          showModal();
        }
      } else {
        navigate('/404notfound');
      }
    } catch (error) {
      console.error('Navigation error:', error);
      navigate('/404notfound');
    }
  };

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
            { key: '1', icon: <OrderedListOutlined />, label: t('Orders View') },
            { key: '2', icon: <SnippetsOutlined />, label: t('Orders For Send') },
            { key: '3', icon: <GoogleOutlined />, label: t('Goods') },
          ],
        },
        {
          key: '1-2',
          label: t('Reports'),
          type: 'group',
          children: [
            { key: '5', icon: <LineChartOutlined />, label: t('Orders Report View') },
            { key: '6', icon: <TableOutlined />, label: t('Invoice Report View') },
          ],
        },
      ],
    },
    {
      key: 'sub2',
      icon: <AppstoreOutlined />,
      label: t('Workspace'),
      children: [
        { key: '5-1', label: t('Deposits'), type: 'group' },
        { key: '7', label: t('Deposit Sales'), icon: <EuroOutlined /> },
        { key: '8', label: t('Order Deposits'), icon: <EuroOutlined /> },
        { key: '9', label: t('Deposit Invoices'), icon: <DollarOutlined /> },
        {
          key: 'sub3',
          label: t('Sales'),
          icon: <BarChartOutlined />,
          children: [
            { key: '10', label: t('Sale to WP'), icon: <TwitterOutlined /> },
            { key: '11', label: t('Direct Sale'), icon: <QqOutlined /> },
          ],
        },
      ],
    },
    {
      key: 'sub4',
      label: t('Settings'),
      icon: <SettingOutlined />,
      children: [
        { key: '20', label: t('Users'), icon: <UserOutlined /> },
        { key: '15', label: t('Roles'), icon: <RedditOutlined /> },
      ],
    },
    {
      key: '24',
      icon: <FlagOutlined />,
      label: t('Language'),
      children: [
        { key: '12', label: t('English'), icon: <Flag country="GB" size={15} /> },
        { key: '13', label: t('Russian'), icon: <Flag country="RU" size={15} /> },
        { key: '14', label: t('Romanian'), icon: <Flag country="RO" size={15} /> },
      ],
    },
    { key: 'sub5', label: t('Logout'), icon: <LogoutOutlined /> },
  ];

  const contentUser = (
    <div>
      {loggedInUser ? (
        <span>{loggedInUser.username || 'Unknown User'}</span>
      ) : (
        <span>{t('noUserLoggedIn')}</span>
      )}
    </div>
  );

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Button
        danger
        style={{ position: 'absolute', top: 5, right: 10 }}
        type="primary"
        shape="circle"
        onClick={handleClose}
      >
        X
      </Button>
      <Button
        style={{ position: 'absolute', top: 5, right: 50 }}
        type="primary"
        shape="circle"
        onClick={handleMinim}
      >
        _
      </Button>

      <Popover content={contentUser} placement="bottom">
        <Button icon={<UserOutlined />} style={{ position: 'absolute', top: 5, right: 95 }} />
      </Popover>

      <Menu onClick={handleClick} mode="horizontal" items={items} />

      <Modal
        title={t('Logout Confirmation')}
        open={isModalVisible}
        onOk={handleOk}
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
        <p>{t('Are you sure you want to logout?')}</p>
      </Modal>
    </div>
  );
};

export default Navbar;