import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <SignUpPage /> },
    { path: "/SignUpPage", element: <SignUpPage /> },
    { path: "/Login", element: <Login /> },
    { path: "/Login/Forgot_pass", element: <Forgot_pass /> },
    { path: "/Reset_Success", element: <Reset_Success /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
