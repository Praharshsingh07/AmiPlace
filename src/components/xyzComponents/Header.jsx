import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { CgOrganisation } from "react-icons/cg";
import { MdConnectWithoutContact } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import SideDrawer from "./SideDrawer";
import UserSearch from "./UserSearch"; // Import the new UserSearch component
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import JobsDropDown from "./JobsDropDown";

const Header = ({ HeaderClassNames }) => {
  const [menu, setMenu] = useState(false);
  const [jobsDropDown, setJobsDropDown] = useState(false);
  const dropdownRef = useRef(null); // Create ref for the dropdown element

  const handleMenuClick = () => {
    setMenu(!menu);
  };

  const handleJobsClick = () => {
    setJobsDropDown(!jobsDropDown);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setJobsDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      <nav className={`${HeaderClassNames} flex items-center justify-between`}>
        {/* Logo and App Name */}
        <div className="logo flex items-center space-x-1 ml-5">
          <div className="img w-14">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/amiplace-3c576.appspot.com/o/amityLogo-removebg-preview.png?alt=media&token=3db5d9e1-79da-4f9a-bf61-9df4a9c03dcc"
              alt="logo"
            />
          </div>
          <div className="appName">
            <span className="text-xl opacity-70">AMIPLACE</span>
            <div className="slogan hidden md:block text-xs opacity-50">
              Place where your career starts!
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center mr-5">
          <div>
            <Link
              to="/"
              className="nav-link mx-3 hover:text-gray-500 hover:border-b-2 border-gray-400 after:border-blue-500 pb-5 mt-5 box-border"
            >
              Community
            </Link>
          </div>
          <div>
            <Link
              to="/Companies"
              className="nav-link mx-3 hover:text-gray-500 hover:border-b-2 border-gray-400 after:border-blue-500 pb-5 mt-5 box-border"
            >
              Companies
            </Link>
          </div>
          <span
            className="mx-3 cursor-pointer"
            onMouseOver={() => handleJobsClick()}
          >
            Jobs/Internships
          </span>
          <div ref={dropdownRef}>
            <JobsDropDown isOpen={jobsDropDown} />
          </div>
        </div>

        <div className="flex">
          <div className="flex-shrink ">
            <UserSearch />
          </div>
          <Link to="/Notifications" className="nav-link mx-3">
            <IoNotifications className="text-xl mt-3" />
          </Link>
          <SideDrawer />
        </div>

        {/* Mobile Menu Icon */}
        <FiMenu
          className="md:hidden mr-5 text-2xl cursor-pointer"
          onClick={handleMenuClick}
        />
      </nav>

      {/* Mobile Menu */}
      {menu && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white shadow-md z-50">
          <div className="flex flex-col p-4 space-y-3">
            <Link
              to="/"
              className="flex items-center space-x-2"
              onClick={handleMenuClick}
            >
              <MdConnectWithoutContact className="text-xl" />
              <span>Community</span>
            </Link>
            <Link
              to="/Notifications"
              className="flex items-center space-x-2"
              onClick={handleMenuClick}
            >
              <IoNotifications className="text-xl" />
              <span>Notifications</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center space-x-2"
              onClick={handleMenuClick}
            >
              <CgProfile className="text-xl" />
              <span>Profile</span>
            </Link>
            <Link
              to="/companies"
              className="flex items-center space-x-2"
              onClick={handleMenuClick}
            >
              <CgOrganisation className="text-xl" />
              <span>Companies</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex text-gray-800 text-base focus:outline-none w-full text-left space-x-2"
            >
              <TbLogout2 className="text-xl mt-1" /> Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
