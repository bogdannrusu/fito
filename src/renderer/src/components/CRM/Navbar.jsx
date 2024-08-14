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
  QqOutlined,
  FlagOutlined,
} from '@ant-design/icons';
import { Button, Menu, Modal, message, Popover } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Flag from 'react-flagkit';

const Navbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [roles, setRoles] = useState([]);

  const routes = {
    '2': '/invoices',
    '20': '/users',
    'sub5': null, 
  };

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
          if (error.response && error.response.status === 401) {
            // Token might be invalid or expired
            localStorage.removeItem('token');
            setLoggedInUser(null);
          }
        }
      }
    };
  
    fetchUser();
  }, []);

  useEffect(() => {
    const savedRoles = JSON.parse(localStorage.getItem('roles'));
    setRoles(savedRoles || []);
  }, []);

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
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
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

 
  
  const handleClick = (e) => {
    try {
      if (['12', '13', '14'].includes(e.key)) {
        handleLanguageChange(e.key);
      } else if (routes[e.key] !== undefined) {
        if (routes[e.key]) {
          navigate(routes[e.key]);
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
              key: '5',
              icon: <LineChartOutlined />,
              label: t('Orders Invoice View'),
            },
            {
              key: '6',
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
        },
        {
          key: '7',
          label: t('Deposit Sales'),
          icon: <EuroOutlined />
        },
        {
          key: '8',
          label: t('Deposit Invoices'),
          icon: <DollarOutlined />
        },
        {
          key: 'sub3',
          label: t('Sales'),
          icon: <BarChartOutlined />,
          children: [
            {
              key: '9',
              label: t('Sale to WP'),
              icon: <TwitterOutlined />
            },
            {
              key: '10',
              label: t('Direct Sale'),
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
          key: '20',
          label: t('Users'),
          icon: <UserOutlined />
        },
        {
          key: '15',
          label: t('Roles'),
          icon: <RedditOutlined />
        },
      ],
    },
    {
      key: '11',
      icon: <FlagOutlined />,
      label: t('Language'),
      children: [
        {
          key: '12',
          label: t('English'),
          icon: <Flag country="GB" size={15} />
        },
        {
          key: '13',
          label: t('Russian'),
          icon: <Flag country="RU" size={15} />
        },
        {
          key: '14',
          label: t('Romanian'),
          icon: <Flag country="RO" size={15} />
        },
      ]
    },
    {
      key: 'sub5',
      label: t('Logout'),
      icon: <LogoutOutlined />,
    },
  ];

  const contentUser = (
    <div>
      {loggedInUser ? (
        <>
          <p>{t('User')}: {loggedInUser.username}</p>
          <p>{t('Email')}: {loggedInUser.email}</p>
        </>
      ) : (
        <p>{t('No user logged in')}</p>
      )}
    </div>
  );

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Button danger
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
        <Button
          icon={<UserOutlined />} 
          style={{ position: 'absolute', top: 5, right: 95 }}
        />
      </Popover>
      
      <Menu
        onClick={handleClick}
        mode="horizontal"
        items={items}
      />
      
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
        <p>{t('Are you sure you want to logout?')}</p>
      </Modal>
    </div>
  );
};

export default Navbar;
