const Header = () => {
  const path = "src/Media/logo.svg";
  return (
    <>
      <div className="navigation flex flex-col md:flex-row justify-between items-center border-b-[0.20px] border-b-gray-500 bg-slate-100">
        {/* Logo */}
        <div className="logo flex space-x-3 ml-5 my-3">
          <div className="img w-7">
            <img src={`${path}`} alt="logo" />
          </div>
          <div className="appName">
            <span className="text-2xl">AMIPLACE</span>
            <div className="slogan text-xs opacity-50">
              Place where your career starts
            </div>
          </div>
        </div>
        {/* Navigation */}
        <div className="navbar flex text-sm justify-end space-x-5 md:space-x-14 md:text-lg p4 mr-5 mt-2">
          <li className="list-none">
            <a href="">Community</a>
          </li>
          <li className="list-none flex flex-col">
            <div className="cursor-not-allowed">Jobs/Interships</div>
            <span className="text-xs opacity-45 ml-2">Comming Soon...</span>
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