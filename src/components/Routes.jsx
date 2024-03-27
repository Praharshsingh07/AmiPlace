import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import SignUpPage from '../components/SignUpPage';
import Forgot_pass from '../components/Forgot_pass';
import Reset_Success from '../components/Reset_Success';
import Dashboard from '../components/Dashboard';
import { AuthContext } from '../components/AuthContext';
import PrivateRoute from '../components/PrivateRoute';

const Router = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={currentUser ? <Dashboard /> : <SignUpPage />} />
      <Route path="/SignUpPage" element={<SignUpPage />} />
      <Route path="/Login" element={currentUser ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/Forgot_pass" element={currentUser ? <Navigate to="/dashboard" /> : <Forgot_pass />} />
      <Route path="/Reset_Success" element={<Reset_Success />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default Router;