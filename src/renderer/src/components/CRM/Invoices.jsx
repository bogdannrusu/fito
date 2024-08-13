/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, Table, Modal, Form, Input } from 'antd';
import Navbar from './Navbar';
import { useTranslation } from 'react-i18next';
import '../../assets/main.css';

const Invoices = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [invoices, setInvoices] = React.useState([]);
  const { t } = useTranslation();

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
  ];

  return (
    <>
      <Navbar />
      <div className="p-5">
      <div className="custom-spacing">
          <Button type="primary" onClick={showCreateInvoiceModal}>
            {t('Create Invoice')}
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
          title={t('Create Invoice')}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} onFinish={handleCreateInvoice}>
            <Form.Item
              label={t('Invoice Number')}
              name="invoice_number"
              rules={[{ required: true, message: t('Please input the invoice number!') }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t('Company')}
              name="company"
              rules={[{ required: true, message: t('Please input the company name!') }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t('Client')}
              name="client"
              rules={[{ required: true, message: t('Please input the client name!') }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
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
