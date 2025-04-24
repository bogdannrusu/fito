/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove('token');
    navigate('/');
  }, [navigate]);

  return null;
};

export default Logout;
