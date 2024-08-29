import React, { useState, useContext } from "react";
import Lottie from "lottie-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase.config";
import { useNavigate, Navigate } from "react-router-dom";
import signupAnimation from "../../animations/animation-2.json";
import loadingAnimation from "../../animations/loadinganimation.json";
import { Link } from "react-router-dom";
import {
  addDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { AuthContext } from "./AuthContext.jsx";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[\w\.-]+@s\.amity\.edu$/;

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email address. Please Use your Amity Email ID";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      setError("");

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const user = userCredential.user;

        // Create or update the user document in the "users" collection
        const userDocRef = doc(db, "users", user.uid);
        const userData = {
          email: user.email,
          createdAt: serverTimestamp(),
        };

        // Add the name field only if it's not empty or undefined
        if (formData.name && formData.name.trim() !== "") {
          userData.name = formData.name.trim();
        }

        await setDoc(userDocRef, userData, { merge: true });
        console.log("User document created/updated successfully");
        console.log(user);

        setFormData({ email: "", password: "" });
        navigate("/dashboard"); // Replace with your desired route
      } catch (error) {
        console.log("Login Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // Redirect if already logged in
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-8 mb-8 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
              Login to your account
            </h2>
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                  {formErrors.email && (
                    <p className="text-red-500">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <Link
                      to="/Forgot_pass"
                      className="font-semibold text-blue-700 hover:text-blue-500"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                  {formErrors.password && (
                    <p className="text-red-500">{formErrors.password}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                    loading
                      ? "bg-white"
                      : "bg-blue-600 text-white hover:bg-blue-500"
                  }`}
                >
                  {loading ? (
                    <Lottie
                      animationData={loadingAnimation}
                      loop={true}
                      style={{ width: 100, height: 50 }}
                    />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?
              <Link
                to="/SignUpPage"
                id="msg"
                className="font-semibold leading-6 text-blue-600 hover:text-indigo-500 ml-2"
              >
                SignUp
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden md:block m-6">
          <Lottie
            className="w-full h-full rounded-xl"
            animationData={signupAnimation}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
