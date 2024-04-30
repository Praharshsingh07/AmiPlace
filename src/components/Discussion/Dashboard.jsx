import "../../index.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Header from "../Header";
import BlogsContainer from "./Blog/BlogsContainer";
import PostListContainer from "./Post/PostListContainer";
import RecentUpdates from "./Recent Updates/RecentUpdates";
import CommunityFooter from "../CommunityFooter";

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
        <BlogsContainer />
        <PostListContainer />
        <div className="w-[32%]">
          <RecentUpdates />
          <CommunityFooter />
        </div>
      </div>
      <a
        href="#"
        className="mt-7 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => handleLogout()}
      >
        Logout
      </a>
    </>
  );
};

export default Dashboard;
