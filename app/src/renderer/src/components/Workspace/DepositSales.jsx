/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import Navbar from '../CRM/Navbar';
import axios from 'axios';

const { Option } = Select;

const DepositSales = () => {
  const [form] = Form.useForm();
  const [deposits, setDeposits] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchDeposits();
    fetchProducts();
  }, []);

  const fetchDeposits = async () => {
    try {
      const response = await axios.get('/http://localhost:4000/api/deposits');
      console.log('API response for deposits:', response.data);
      setDeposits(response.data); // Assuming response.data is an array
    } catch (error) {
      console.error('Failed to fetch deposits:', error);
      message.error('Failed to fetch deposits');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/http://localhost:4000/api/goods');
      console.log('API response for products:', response.data);
      setProducts(response.data); // Assuming response.data is an array
    } catch (error) {
      console.error('Failed to fetch products:', error);
      message.error('Failed to fetch products');
    }
  };

  const onFinish = async (values) => {
    try {
      await axios.post('/deposit-sales', values);
      message.success('Deposit sale completed successfully');
      form.resetFields();
    } catch (error) {
      console.error('Failed to complete deposit sale:', error);
      message.error('Failed to complete deposit sale');
    }
  };

  return (
    <>
      <Navbar />
      <div className="deposit-sales">
        <h2>Deposit Sales</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="fromDepositId"
            label="From Deposit"
            rules={[{ required: true, message: 'Please select the source deposit' }]}
          >
            <Select placeholder="Select source deposit">
              {deposits.map(deposit => (
                <Option key={deposit.id} value={deposit.id}>
                  {deposit.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="toDepositId"
            label="To Deposit"
            rules={[{ required: true, message: 'Please select the destination deposit' }]}
          >
            <Select placeholder="Select destination deposit">
              {deposits.map(deposit => (
                <Option key={deposit.id} value={deposit.id}>
                  {deposit.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="productId"
            label="Product"
            rules={[{ required: true, message: 'Please select a product' }]}
          >
            <Select placeholder="Select product">
              {products.map(product => (
                <Option key={product.id} value={product.id}>
                  {product.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              { required: true, message: 'Please enter the quantity' },
              { type: 'number', min: 1, message: 'Quantity must be at least 1' }
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Complete Sale
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default DepositSales;
