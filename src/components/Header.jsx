import { useSelector } from "react-redux";
import logoSlice from "../store/LogoSlice";

const Header = () => {
  const path = "src/Media/logo.svg";
  return (
    <>
      <div className="navigation flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="logo flex space-x-3 ml-5 my-3">
          <div className="img w-7">
            <img src={`${path}`} alt="logo" />
          </div>
          <div className="appName">
            <span className="text-2xl">AmiPlace</span>
          </div>
        </div>
        {/* Navigation */}
        <div className="navbar flex text-sm justify-end space-x-5 md:space-x-14 md:text-lg p4 mr-5">
          <li className="list-none">
            <a href="">Community</a>
          </li>
          <li className="list-none">
            <a href="">Jobs/Interships</a>
          </li>
          <li className="list-none">
            <a href="">Companies</a>
          </li>
        </div>
      </div>
    </>
  );
};
export default Header;
