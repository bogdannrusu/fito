/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate('/');
  }

  const onFinish = async (values) => {
    try {
      // Sign up user
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username: values.username,
        password: values.password,
        confirm: values.confirm,
        email: values.email,
      });

      if (response.status === 201) {
        message.success('Account created successfully!');

        // Authenticate user
        const loginResponse = await axios.post('http://localhost:5000/api/users/login', {
          username: values.username,
          password: values.password,
        });

        if (loginResponse.data.token) {
          localStorage.setItem('token', loginResponse.data.token);
          message.success('Login successful!');
          navigate('/navbar');
        }
      }
    } catch (error) {
      message.error('Sign-up failed. Please try again.');
      console.error('Failed:', error.response.data);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <div style={{ maxWidth: 300 }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Creare Account</Title>
        <Form
          form={form}
          name="signup"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
          </Form.Item>

          {/* Add email field if needed */}
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Creare Account
            </Button>
            <Button onClick={navigateLogin} type="secondary" style={{ width: '100%' }}>
              Ai un cont? Conectati-vă
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
