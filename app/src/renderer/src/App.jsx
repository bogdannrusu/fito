/* eslint-disable prettier/prettier */
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/CRM/Navbar';
import Login from './components/Login/Login';
import Logout from './components/Login/Logout';
import UserComponent from './components/Settings/UsersComponent';
import SignUp from './components/Login/SignUp';
import Invoices from './components/CRM/Invoices';
import './i18n';
import './assets/main.css';
import NotFound from './components/Settings/404NotFound';
import Orders from './components/CRM/Orders';
import Contragents from './components/CRM/Contragents';
import Units from './components/CRM/Units';
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
            <Route path="/invoices" element={isAuthenticated ? <Invoices /> : <Navigate to="/" />} />
            <Route path="/users" element={isAuthenticated ? <UserComponent /> : <Navigate to="/" />} />
            <Route path="/orders" element={isAuthenticated ? <Orders /> : <Navigate to="/" />} />
            <Route path="/contragents" element={isAuthenticated ? <Contragents /> : <Navigate to="/" />} />
            <Route path="/units" element={isAuthenticated ? <Units /> : <Navigate to="/" />} />
            <Route path="/depositsales" element={isAuthenticated ? <DepositSales /> : <Navigate to="/" />} />
            <Route path="/404notfound" element={<NotFound /> } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
