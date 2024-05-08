import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import SignUpPage from "./SignUpPage";
import Forgot_pass from "./Forgot_pass";
import Dashboard from "../Discussion/Dashboard";
import { AuthContext } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";
import EmailVerify from "./email";
import CompaniesMain from "../Companies/CompaniesMain";

const Router = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={currentUser ? <Dashboard /> : <SignUpPage />} />
      <Route path="/SignUpPage" element={<SignUpPage />} />
      <Route
        path="/Login"
        element={currentUser ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route path="/EmailVerify" element={<EmailVerify />} />
      <Route
        path="/Forgot_pass"
        element={currentUser ? <Navigate to="/dashboard" /> : <Forgot_pass />}
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/companies" element={<CompaniesMain />}></Route>
      {/* <Route path="/details" element={<CompanyDetails />}></Route> */}
    </Routes>
  );
};

export default Router;
