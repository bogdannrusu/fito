/* eslint-disable prettier/prettier */
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/CRM/Navbar';
import Login from './components/Login/Login';
import Logout from './components/Login/Logout';
import UserComponent from './components/Settings/UsersComponent';
import Goods from './components/CRM/Goods';
import OrdersForSend from './components/CRM/OrdersForSend';
import SignUp from './components/Login/SignUp';
import NotFound from './components/Settings/404NotFound';
import Orders from './components/CRM/Orders';
import OrdersReportView from './components/Reporting/OrdersReportView';
import RolesComponent from './components/Settings/RolesComponent';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import './i18n';
import './assets/main.css';



const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Verificăm tokenul la încărcarea componentei
    const token = Cookies.get('token');
    console.log('Token in App.jsx:', token);
    setIsAuthenticated(!!token);
  }, []);

  // Re-verificăm tokenul la fiecare randare (opțional, poate fi ineficient în unele cazuri)
  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get('token');
      setIsAuthenticated(!!token);
    };
    
    // Verifică la fiecare 2 secunde (in caz că tokenul a fost setat după randare)
    const interval = setInterval(checkAuth, 2000);
    return () => clearInterval(interval);
  }, []);

  console.log('Is authenticated:', isAuthenticated);

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
            <Route path="/orderreport" element={isAuthenticated ? <OrdersReportView /> : <Navigate to="/" />} />
            <Route path="/users" element={isAuthenticated ? <UserComponent /> : <Navigate to="/" />} />
            <Route path='/roles' element={isAuthenticated ? <RolesComponent /> : <Navigate to="/" />} />
            <Route path="/orders" element={isAuthenticated ? <Orders /> : <Navigate to="/" />} />
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
