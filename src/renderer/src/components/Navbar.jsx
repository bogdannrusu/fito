/* eslint-disable prettier/prettier */
//import React from 'react';
import { 
  AppstoreOutlined, 
  FileDoneOutlined, 
  SettingOutlined,
  OrderedListOutlined,
  SnippetsOutlined,
  LineChartOutlined,
  SolutionOutlined, 
  FontSizeOutlined,
  TableOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
  {
    key: 'sub1',
    icon: <FileDoneOutlined />,
    label: 'CRM',
    children: [
      {
        key: '1-1',
        label: 'Orders',
        type: 'group',
        children: [
          {
            key: '1',
            icon: <OrderedListOutlined />,
            label: 'Orders View',
          },
          {
            key: '2',
            icon: <SnippetsOutlined />,
            label: 'Invoices View',
          },
          {
            key: '3',
            icon: <SolutionOutlined />,
            label: 'Contragents',
          },
          {
            key: '4',
            icon: <FontSizeOutlined />,
            label: 'Units',
          },
        ],
      },
      {
        key: '1-2',
        label: 'Reports',
        type: 'group',
        children: [
          {
            key: '3',
            icon: <LineChartOutlined />,
            label: 'Orders Invoice View',
          },
          {
            key: '4',
            icon: <TableOutlined />,
            label: 'Invoice Report View',
          },
        ],
      },
    ],
  },
  {
    key: 'sub2',
    icon: <AppstoreOutlined />,
    label: 'Workspace',
    children: [
      {
        key: '5',
        label: 'Option 5',
      },
      {
        key: '6',
        label: 'Option 6',
      },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          {
            key: '7',
            label: 'Option 7',
          },
          {
            key: '8',
            label: 'Option 8',
          },
        ],
      },
    ],
  },
  {
    key: 'sub4',
    label: 'Settings',
    icon: <SettingOutlined />,
    children: [
      {
        key: '9',
        label: 'Option 9',
      },
      {
        key: '10',
        label: 'Option 10',
      },
      {
        key: '11',
        label: 'Option 11',
      },
      {
        key: '12',
        label: 'Option 12',
      },
    ],
  },
];
const onClick = (e) => {
  console.log('click', e);
};
const Navbar = () => (
  <Menu
    onClick={onClick}
    style={{
      width: 725,
    }}
    mode="horizontal"
    items={items}
  />
);
export default Navbar;