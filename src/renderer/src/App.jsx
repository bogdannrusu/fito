/* eslint-disable prettier/prettier */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/CRM/Navbar';
import Login from './components/Login';
import Logout from './components/Logout';
import UserComponent from './components/Settings/UsersComponent';
import SignUp from './components/SignUp';
import Invoices from './components/CRM/Invoices';
import './i18n';


const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="flex flex-1 overflow-hidden">
          {/* {isAuthenticated && <Navbar />} Conditionally render Navbar */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/navbar" element={isAuthenticated ? <Navbar /> : <Navigate to="/" />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={isAuthenticated ? <UserComponent /> : <Navigate to="/" />} />
            <Route path="/invoices" element={isAuthenticated ? <Invoices /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
