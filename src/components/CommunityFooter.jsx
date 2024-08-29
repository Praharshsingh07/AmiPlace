import { GrBug } from "react-icons/gr";
import { MdOutlinePolicy } from "react-icons/md";
import { AiOutlineAudit } from "react-icons/ai";
import { Link } from "react-router-dom";
const CommunityFooter = () => {
  return (
    <div className="Community-footer hidden md:block sticky top-[500px] bg-[#f6f6f6] opacity-70 rounded-xl w-[300px] h-[200px] py-5 px-3 ml-6 border-[0.1px]">
      <div className="footer-links flex flex-col text-gray-600 text-base">
        <Link
          to="/FeatureBugForm"
          className="footer-link underline hover:text-black flex"
        >
          <GrBug className="mx-2 mt-1" />
          Feature Request / Bug Report
        </Link>
        <a href="#" className="footer-link underline hover:text-black flex">
          <MdOutlinePolicy className="mx-2 mt-1 text-lg" />
          Terms of use.
        </a>
        <a
          href="https://s.amizone.net/"
          target={"_blank"}
          className="footer-link underline hover:text-black flex"
        >
          <AiOutlineAudit className="mx-2 mt-1 text-black hover:opacity-100 opacity-85 text-lg" />
          Amizone
        </a>
      </div>
      <p className="mt-3 text-base text-gray-600">
        Copyright &copy; 2024, Amiplace{" "}
      </p>
    </div>
  );
};
export default CommunityFooter;
