import React from "react";
import Info_fill from "./Info_fill";
import UserBasicInfo from "./UserBasicInfo";
import UserAvatar from "./UserAvatar";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";

const Display_profile = () => {
  return (
    <>
      <div className="relative bg-slate-200 sm:w-full md:w-full lg:w-full flex flex-col items-center p-5 m-0 overflow-y-hidden">
        {/* Back to Dashboard Button positioned at the top left */}
        <div className="absolute top-5 left-5">
          <Link to="/dashboard">
            <button className="bg-gray-400 flex space-x-1 text-white px-2 py-2 rounded-md shadow-md hover:bg-gray-600">
              <IoChevronBack className="mt-1"/> Community
            </button>
          </Link>
        </div>

        <div className="bg-slate-100 h-1/2 w-4/5 xsm:w-4/5 sm:w-4/5 md:w-4/5 lg:w-4/5 flex justify-evenly p-5 rounded-xl shadow-xl gap-5 mb-10">
          <UserAvatar />
          <UserBasicInfo />
        </div>
        <Info_fill />
      </div>
    </>
  );
};

export default Display_profile;
