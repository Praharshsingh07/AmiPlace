import { Link } from "react-router-dom";
import { IoConstructOutline } from "react-icons/io5";

const JobsDropDown = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="jobs-drop-down text-sm bg-gray-50 border-x-2 border-b-2 border-gray-300 w-48 flex flex-col">
      <Link to="/CampusPlacements" className="px-4 py-5 hover:bg-gray-200 border-b">
        Campus Placements
      </Link>
      <Link to="/UserList" className="px-4 py-5 hover:bg-gray-200 border-b">
        Filter students
      </Link>
      <span className="flex gap-2 px-4 py-5 text-gray-500 cursor-not-allowed hover:bg-gray-200">
        Referrals
        <IoConstructOutline className="mt-1" />
      </span>
    </div>
  );
};

export default JobsDropDown;