import {
  createBrowserRouter,
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  RouterProvider
} from "react-router-dom";
import Login from "./Pages/Login";
import SignUpPage from "./components/SignUpPage";
import Forgot_pass from "./components/Forgot_pass"
import Reset_Success  from "./components/Reset_Success"

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
