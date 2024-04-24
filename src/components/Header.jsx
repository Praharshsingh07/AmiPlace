import React, { useState, useEffect } from "react";
import classNames from "classnames";
import {Link} from "react-router-dom"
const Header = () => {
  const path = "src/Media/logo.svg";

  return (
    <>
      <nav
        className={classNames(
          "sticky",
          "z-30",
          "top-0",
          "left-0",
          "w-full",
          "transition",
          "duration-[350ms]",
          "navigation",
          "flex",
          "flex-col",
          "md:flex-row",
          "justify-between",
          "items-center",
          "border-b-[0.20px]",
          "border-b-gray-500",
          "h-16",
          "bg-slate-200",
        )}
      >
        {/* Your navigation content here */}
        <div className="logo flex space-x-1 ml-5 my-3">
          <div className="img w-7">
            <img src={`${path}`} alt="logo" />
          </div>
          <div className="appName">
            <span className="text-xl">AMIPLACE</span>
            <div className="slogan text-xs opacity-50">
              Place where your career starts
            </div>
          </div>
        </div>
        {/* Navigation */}
        <div className="navbar flex text-sm justify-end space-x-5 md:space-x-14 md:text-lg p4 mr-5 mt-2">
          <li className="list-none">
            <Link to="/">Community</Link>
          </li>
          <li className="list-none flex flex-col">
            <div className="cursor-not-allowed">Jobs/Interships</div>
            <span className="text-xs opacity-45 ml-2">Comming Soon...</span>
          </li>
          <li className="list-none">
            <Link to="/Companies">Companies</Link>
          </li>
        </div>
      </nav>
    </>
  );
};
export default Header;
