/* eslint-disable prettier/prettier */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Row, Col, Button } from 'antd';
import Navbar from '../Navbar';

const { Option } = Select;

const ContragentDetails = ({ contragent }) => {
  const [formData, setFormData] = useState({
    name: contragent.name || '',
    type: contragent.type || 'individual',
    contactPerson: contragent.contactPerson || '',
    email: contragent.email || '',
    phone: contragent.phone || '',
    street: contragent.address?.street || '',
    city: contragent.address?.city || '',
    country: contragent.address?.country || '',
    postalCode: contragent.address?.postalCode || ''
  });

  const handleChange = (value, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Save logic to update the contragent in the backend
    console.log('Saved Contragent:', formData);
  };

  return (
    <>
    <Navbar />
    <div>
      <h2>Contragent Details</h2>
      <Row gutter={16}>
        <Col span={12}>
          <label>Name:</label>
          <Input
            value={formData.name}
            onChange={(e) => handleChange(e.target.value, 'name')}
            placeholder="Enter Name"
          />
        </Col>
        <Col span={12}>
          <label>Type:</label>
          <Select
            value={formData.type}
            onChange={(value) => handleChange(value, 'type')}
            style={{ width: '100%' }}
          >
            <Option value="individual">Individual</Option>
            <Option value="company">Company</Option>
          </Select>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <label>Contact Person:</label>
          <Input
            value={formData.contactPerson}
            onChange={(e) => handleChange(e.target.value, 'contactPerson')}
            placeholder="Enter Contact Person"
          />
        </Col>
        <Col span={12}>
          <label>Email:</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange(e.target.value, 'email')}
            placeholder="Enter Email"
          />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <label>Phone:</label>
          <Input
            value={formData.phone}
            onChange={(e) => handleChange(e.target.value, 'phone')}
            placeholder="Enter Phone"
          />
        </Col>
        <Col span={12}>
          <label>Street:</label>
          <Input
            value={formData.street}
            onChange={(e) => handleChange(e.target.value, 'street')}
            placeholder="Enter Street"
          />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <label>City:</label>
          <Input
            value={formData.city}
            onChange={(e) => handleChange(e.target.value, 'city')}
            placeholder="Enter City"
          />
        </Col>
        <Col span={12}>
          <label>Country:</label>
          <Input
            value={formData.country}
            onChange={(e) => handleChange(e.target.value, 'country')}
            placeholder="Enter Country"
          />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <label>Postal Code:</label>
          <Input
            value={formData.postalCode}
            onChange={(e) => handleChange(e.target.value, 'postalCode')}
            placeholder="Enter Postal Code"
          />
        </Col>
      </Row>

      <Button type="primary" onClick={handleSave} style={{ marginTop: '20px' }}>
        Save Changes
      </Button>
    </div>
    </>
  );
};

// PropTypes validation
ContragentDetails.propTypes = {
  contragent: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['individual', 'company']).isRequired,
    contactPerson: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    address: PropTypes.shape({
      street: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.string,
      postalCode: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ContragentDetails;
