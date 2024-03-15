import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config.js";
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/backbgsignup.png';

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlelogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setEmail("");
        setPassword("");
        // Redirect the user or perform other actions after successful login
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        const errorMessage = error.message;
        console.log(errorMessage);
        setError(true);
        // Set error state to display error message to the user
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="bg-white bg-opacity-75 backdrop-filter backdrop-blur-sm rounded-lg p-12 shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Login</h2>
        <form onSubmit={handlelogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter your College Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Login
            </button>
            {error && <span className="text-red-500 ml-4">Something went wrong! Please Try Again</span>}
          </div>
        </form>
        <button onClick={() => navigate("/Pages/Signup")} className="mt-4 w-full bg-transparent text-blue-500 hover:text-blue-700">
          Signup
        </button>
      </div>
    </div>
  );
};

export default Login;