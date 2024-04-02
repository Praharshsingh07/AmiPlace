import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Auth/Routes";
import { AuthProvider } from "./components/Auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
