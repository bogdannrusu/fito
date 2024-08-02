/* eslint-disable prettier/prettier */
import { 
  AppstoreOutlined, 
  FileDoneOutlined, 
  SettingOutlined,
  OrderedListOutlined,
  SnippetsOutlined,
  LineChartOutlined,
  SolutionOutlined, 
  FontSizeOutlined,
  TableOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

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
  {
    key: 'sub5',
    label: 'Logout',
    icon: <LogoutOutlined />,
  }
];

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    console.log('click', e);
    if (e.key === '1') {
      navigate('/dashboard');
    }
    // Mai multe conditii vor fi aici in caz de ceva
  };

  return (
    <div>
      <Menu
        onClick={handleClick}
        style={{ width: 725 }}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};

export default Navbar;
