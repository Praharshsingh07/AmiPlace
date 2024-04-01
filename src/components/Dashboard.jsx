import "../index.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Footer from "../components/Footer";
import Header from "./Header";
import PostListContainer from "./PostListContainer";
import RecentUpdates from "./RecentUpdates";
import Blog from "./Blog";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <>
      <Header />
      <div className="flex">
        <Blog />
        <PostListContainer />
        <RecentUpdates />
      </div>
      <a
        href="#"
        class="mt-7 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => handleLogout()}
      >
        Logout
      </a>
    </>
  );
};

export default Dashboard;
