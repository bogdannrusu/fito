/* eslint-disable prettier/prettier */
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        username: values.username,
        password: values.password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        message.success('Login successful!');
        navigate('/navbar');
      }

    } catch (error) {
      message.error('Login failed. Please check your credentials and try again.');
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
      message.error('Admin credentials are incorrect.');
    }
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
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
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
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Button
        type="link"
        onClick={handleAdminSignUp}
        style={{ marginTop: '20px' }}
      >
        Connect
      </Button>
    </div>
  );
};

export default Login;
