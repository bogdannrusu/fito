/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, DatePicker, message, Select } from 'antd';
import Navbar from './Navbar';
import { useTranslation } from 'react-i18next';
import '../../assets/main.css';
import axios from 'axios';
import { FileAddOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const Invoices = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { t } = useTranslation();

  const handleNavigate = () => {
    navigate("/navbar");
  };

  // Fetch invoices when the component mounts
  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/invoices', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInvoices(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch invoices:', error);
        message.error(t('Failed to load invoices. Please try again later.'));
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [t]);

  // Fetch usernames and the logged-in user's information when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch all usernames
        const usersResponse = await axios.get('http://localhost:4000/api/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsernames(usersResponse.data.map(user => user.username));

        // Fetch logged-in user information
        const loggedInUserResponse = await axios.get('http://localhost:4000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoggedInUser(loggedInUserResponse.data.user.username);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        message.error(t('Failed to load user data. Please try again later.'));
      }
    };

    fetchUserData();
  }, [t]);

  // Fetch deposits when the component mounts
  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/deposits', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDeposits(response.data);
      } catch (error) {
        console.error('Failed to fetch deposits:', error);
        message.error(t('Failed to load deposits. Please try again later.'));
      }
    };

    fetchDeposits();
  }, [t]);

  // Handle creating a new invoice
  const handleCreateInvoice = async (values) => {
    try {
      const token = localStorage.getItem('token');

      // Convert the date to the required format
      const formattedValues = {
        ...values,
        createdDate: values.createdDate ? values.createdDate.toISOString() : undefined,
      };

      // Check formatted values before making the request
      console.log("Formatted Values:", formattedValues);

      // Make sure all required fields, including deposit, are included
      const response = await axios.post('http://localhost:4000/api/invoices', formattedValues, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setInvoices([...invoices, response.data]); // Add new invoice to the state
      message.success(t('Invoice created successfully!'));
      setIsModalVisible(false);
      form.resetFields(); // Reset form fields
    } catch (error) {
      console.error('Failed to create invoice:', error.response?.data || error.message);
      message.error(t('Failed to create invoice. Please try again later.'));
    }
  };

  // Handle editing an existing invoice
  const handleEditInvoice = async (invoiceId, updatedValues) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:4000/api/invoices/${invoiceId}`, updatedValues, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedInvoices = invoices.map(invoice =>
        invoice._id === invoiceId ? { ...invoice, ...updatedValues } : invoice
      );
      setInvoices(updatedInvoices);
      message.success(t('Invoice updated successfully!'));
    } catch (error) {
      console.error('Failed to update invoice:', error);
      message.error(t('Failed to update invoice. Please try again later.'));
    }
  };

  const showCreateInvoiceModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: t('Invoice Number'),
      dataIndex: 'invoice_number',
      key: 'invoice_number',
    },
    {
      title: t('Company'),
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: t('Client'),
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: t('Created Date'),
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: t('Deposit'),
      dataIndex: 'deposit',
      key: 'deposit',
    },
    {
      title: t('Username'),
      dataIndex: 'username',
      key: 'username',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="p-5">
        <div className="custom-spacing">
          <Button 
            type="primary" 
            onClick={showCreateInvoiceModal}
            icon={<FileAddOutlined />} 
            style={{ backgroundColor: '#37bd8e', color: '#ffffff' }}
          >
            {t('Create Invoice')}
          </Button>
          <Button
            style={{ marginLeft: '1685px' }}
            onClick={ handleNavigate }
          >
            {t('X')}
          </Button>
        </div>
        <div className='tailwind'>
          <div className="mb-5">
            <div className='mb-20 mt-20 ml-7'>
              <Table
                columns={columns}
                dataSource={invoices}
                loading={loading}
                rowKey="_id"
              />
            </div>
          </div>
        </div>
        <Modal
          title={t('Edit Invoice')}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} onFinish={handleCreateInvoice} initialValues={{ username: loggedInUser }}>
            <Form.Item
              label={t('Invoice Number')}
              name="invoice_number"
              rules={[{ required: true, message: t('Please input the invoice number!') }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="company"
              label={t('Company')}
              rules={[{ required: true, message: 'Please select a company' }]}
            >
              <Select>
                <Option value="BRS Industries SRL">BRS Industries</Option>
                <Option value="Viscomplac SRL">Viscomplac</Option>
                <Option value="Promoauto SRL">Promoauto</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label={t('Deposit')}
              name="deposit"
              rules={[{ required: true, message: t('Please select a deposit!') }]}
            >
              <Select>
                {deposits.map((deposit) => (
                  <Option key={deposit._id || deposit.id} value={deposit._id || deposit.id}>
                    {deposit.deposit_name || deposit.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={t('Username')}
              name="username"
              rules={[{ required: true, message: t('Please select a username!') }]}
            >
              <Select defaultValue={loggedInUser}>
                {usernames.map((username) => (
                  <Option key={username} value={username}>
                    {username}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={t('Created Date')}
              name="createdDate"
              rules={[{ required: true, message: t('Please select the created date!') }]}
            >
              <DatePicker format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<FileAddOutlined />}>
                {t('Create')}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Invoices;
