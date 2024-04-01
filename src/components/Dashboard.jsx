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
    </>
  );
};

export default Dashboard;
