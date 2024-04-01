import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import EmailVerify from './email';
import SignUpPage from '../components/SignUpPage';
import Dashboard from '../components/Dashboard';
import { AuthContext } from "../components/AuthContext";
const Router = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={currentUser ? <Dashboard /> : <Navigate to="/Login" />} />
      <Route path="/SignUpPage" element={<SignUpPage />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/dashboard" element={currentUser ? <Dashboard /> : <Navigate to="/Login" />} />
      <Route path="/EmailVerify" element={<EmailVerify />} />
      
    </Routes>
  );
};

export default Router;