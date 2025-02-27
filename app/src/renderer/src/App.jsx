/* eslint-disable prettier/prettier */
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/CRM/Navbar';
import Login from './components/Login/Login';
import Logout from './components/Login/Logout';
import UserComponent from './components/Settings/UsersComponent';
import Goods from './components/CRM/Goods';
import OrdersForSend from './components/CRM/OrdersForSend';
import SignUp from './components/Login/SignUp';
import './i18n';
import './assets/main.css';
import NotFound from './components/Settings/404NotFound';
import Orders from './components/CRM/Orders';
import DepositSales from './components/Workspace/DepositSales';


const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="flex flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/navbar" element={isAuthenticated ? <Navbar /> : <Navigate to="/" />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/goods" element={isAuthenticated ? <Goods /> : <Navigate to="/" />} />
            <Route path="/users" element={isAuthenticated ? <UserComponent /> : <Navigate to="/" />} />
            <Route path="/orders" element={isAuthenticated ? <Orders /> : <Navigate to="/" />} />
            <Route path="/depositsales" element={isAuthenticated ? <DepositSales /> : <Navigate to="/" />} />
            <Route path="/orderforsend" element={isAuthenticated ? <OrdersForSend /> : <Navigate to="/" />} />
            <Route path="/404notfound" element={<NotFound /> } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
