import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdConstruction } from "react-icons/md";
import { useState } from "react";
const Header = () => {
  const path = "src/Media/logo.svg";
  const [menu, setMenu] = useState(false);
  const handleMenuClick = () => {
    setMenu(!menu);
  };
  return (
    <>
      <nav className="sticky z-30 top-0 left-0 w-full transition duration-[350ms] navigation flex justify-between items-center border-b-[0.20px] border-b-gray-500 bg-slate-200">
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
        <div className="hidden navbar md:flex space-x-14 text-lg p4 mr-5 mt-2">
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
        <FiMenu
          className="md:hidden mr-3 text-2xl cursor-pointer"
          onClick={handleMenuClick}
        />
      </nav>
      <div
        class={`${
          menu == false && "hidden"
        } md:hidden fixed top-17 z-30 side-bar w-full h-[30vh] p-5  font-medium border-[1px] text-lg bg-gray-100 text-purple-500 shadow-sm`}
      >
        <span className="text-xl font-medium mr-1 text-gray-600">
          Navitage to:
        </span>
        <li class="list-none mx-3 my-2">
          <Link to="/">Community</Link>
        </li>
        <li class="list-none mx-3 my-2 text-gray-400 flex">
          <span>Jobs/Interships</span>
          <MdConstruction className="ml-2 mt-[5px] text-xl" />
        </li>
        <li class="list-none mx-3 my-2">
          <Link to="/Companies">Companies</Link>
        </li>
      </div>
    </>
  );
};
export default Header;
