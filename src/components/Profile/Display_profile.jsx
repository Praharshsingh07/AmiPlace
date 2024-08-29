import React, { useState } from "react";
import Info_fill from "./Info_fill";
import { useSelector } from "react-redux";
import About_You from "./overlays/About_You";
import UserBasicInfo from "./UserBasicInfo";
import UserAvatar from "./UserAvatar";

const Display_profile = () => {

  return (
    <>
      <div className=" bg-slate-200  sm:w-full md:w-full lg:w-full flex flex-col  items-center p-5 m-0  overflow-y-hidden">
        <div className=" bg-slate-100 h-1/2 w-4/5 xsm:w-4/5 sm:w-4/5 md:w-4/5 lg:w-4/5 flex  justify-evenly  p-5 rounded-xl  shadow-xl gap-5 mb-10">
          <UserAvatar />
          <UserBasicInfo />
        </div>
        <Info_fill />
      </div>
    </>
  );
};

export default Display_profile;
