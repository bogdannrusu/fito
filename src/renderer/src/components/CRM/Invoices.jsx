/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, Table, Modal, Form, Input } from 'antd';
import Navbar from './Navbar';

const Invoices = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [invoices, setInvoices] = React.useState([]);

  const showCreateInvoiceModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleCreateInvoice = (values) => {
    console.log('Form values:', values);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Invoice Number',
      dataIndex: 'invoice_number',
      key: 'invoice_number',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="p-5">
        <div className="mb-5">
          <Button type="primary" onClick={showCreateInvoiceModal}>
            Create Invoice
          </Button>
        </div>
        <div className="mb-5">
          <Table
            columns={columns}
            dataSource={invoices}
            loading={loading}
            rowKey="_id"
          />
        </div>
        <Modal
          title="Create Invoice"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} onFinish={handleCreateInvoice}>
            <Form.Item
              label="Invoice Number"
              name="invoice_number"
              rules={[{ required: true, message: 'Please input the invoice number!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Company"
              name="company"
              rules={[{ required: true, message: 'Please input the company name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Client"
              name="client"
              rules={[{ required: true, message: 'Please input the client name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Invoices;
