/* eslint-disable prettier/prettier */
import { Button, Checkbox, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Flag from 'react-flagkit';

const { Option } = Select;

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { t, i18n } = useTranslation();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        username: values.username,
        password: values.password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        message.success(t('Login successful!'));
        navigate('/navbar');
      }
    } catch (error) {
      message.error(t('Login failed. Please check your credentials and try again.'));
      console.error('Failed:', error.response.data);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error('Failed:', errorInfo);
  };

  const handleCloseApp = () => {
    const electronFunction = window.electron();
    const electronCloseApp = window.electron.closeApp()
    if (electronFunction && electronCloseApp) {
      electronCloseApp();
    } else {
      console.error('window.electron.closeApp is not a function');
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
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'relative' }}>
      <Button danger
        style={{ position: 'absolute', top: 10, right: 10 }}
        type="primary"
        shape="circle"
        onClick={handleCloseApp}
      >
        X
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
        <Flag country="RU" size={15}/>
          
        </Option>
      </Select>

      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          width: '100%',
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={t('Username')}
          name="username"
          rules={[
            {
              required: true,
              message: t('Please input your username!'),
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label={t('Password')}
          name="password"
          rules={[
            {
              required: true,
              message: t('Please input your password!'),
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>{t('Remember me')}</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            {t('Submit')}
          </Button>
        </Form.Item>
      </Form>
      <Button
        type="link"
        onClick={handleAdminSignUp}
        style={{ marginTop: '20px' }}
      >
        {t('Connect')}
      </Button>
    </div>
  );
};

export default Login;
