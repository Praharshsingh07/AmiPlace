import { BrowserRouter as Router,Routes, Route, Navigate } from 'react-router-dom';
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/Pages/Login" replace />} />
        <Route path="/Pages/Login" element={<Login />} />
        <Route path="/Pages/Signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;