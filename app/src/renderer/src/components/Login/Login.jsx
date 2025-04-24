/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Button, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Flag from 'react-flagkit';
import logo from '../../assets/icons/logo.webp';
import Cookies from 'js-cookie';
import { apiUrls } from '../../../../../services/api';

axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`;

const { Option } = Select;

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();

  // Folosim URL-ul API din serviciul centralizat
  const API_URL = apiUrls.CURRENT_API_URL;

  const onFinish = async (values) => {
    try {
      const response = await axios.post(`${API_URL}/api/users/login`, {
        username: values.username,
        password: values.password,
      });

      console.log('Login response:', response.data); // Debug răspunsul API

      if (response.data.token) {
        // În Electron, opțiunile secure și sameSite pot cauza probleme, așa că le eliminăm
        Cookies.set('token', response.data.token, { expires: 1 }); // Expiră după 1 zi
        Cookies.set('roles', JSON.stringify(response.data.roles || []), { expires: 1 });

        // Debug pentru a verifica dacă cookie-ul a fost setat corect
        console.log('Token cookie set:', Cookies.get('token'));

        message.success(t('Login successful!'));
        navigate('/navbar');
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      message.error(t('Login failed. Please check your credentials and try again.'));
      console.error('Login error:', error.response?.data || error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error('Form failed:', errorInfo);
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

  const handleAdminSignUp = () => {
    const values = form.getFieldsValue();
    if (values.username === 'admin' && values.password === 'Ban4ever') {
      navigate('/signup');
    } else {
      message.error(t('Admin credentials are incorrect.'));
    }
  };

  const handleLanguageSelector = (language) => {
    i18n.changeLanguage(language);
    message.success(t(`Language changed to ${language}`));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <Button
        danger
        style={{ position: 'absolute', top: 10, right: 10 }}
        type="primary"
        shape="circle"
        onClick={handleClose}
      >
        X
      </Button>
      <Button
        style={{ position: 'absolute', top: 10, right: 50 }}
        type="primary"
        shape="circle"
        onClick={handleMinim}
      >
        _
      </Button>

      <Select
        defaultValue={i18n.language}
        style={{ position: 'absolute', top: 10, left: 10 }}
        onChange={handleLanguageSelector}
      >
        <Option value="en">
          <Flag country="GB" size={15} />
        </Option>
        <Option value="ro">
          <Flag country="RO" size={15} />
        </Option>
        <Option value="ru">
          <Flag country="RU" size={15} />
        </Option>
      </Select>

      <img src={logo} alt="Fito logo" style={{ width: '150px', marginBottom: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} />

      <Form
        form={form}
        name="login"
        style={{
          maxWidth: '400px',
          width: '100%',
          padding: '20px',
          backgroundColor: '#f7f7f7',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label={t('Username')}
          name="username"
          rules={[{ required: true, message: t('Please input your username!') }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('Password')}
          name="password"
          rules={[{ required: true, message: t('Please input your password!') }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="primary" htmlType="submit" style={{ width: '45%' }}>
            {t('Submit')}
          </Button>
          <Button type="default" onClick={handleAdminSignUp} style={{ width: '45%' }}>
            {t('Connect')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;