import React, { useState } from "react";
import Info_fill from "./Info_fill";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import User_Icon from "../assest/user_Icon.json";
import About_You from "../overlays/About_You";

const Display_profile = () => {
  const [showModal, setShowModal] = useState(false);

  const { FullName, CourseName, UniversityName, CurrentLocation, Gender, DOB } =
    useSelector((store) => store.AboutYou.UserInput);

  return (
    <>
      <div className=" bg-slate-200  sm:w-full md:w-full lg:w-full flex flex-col  items-center p-5 m-0  overflow-y-hidden">
        {/*  display div */}

        <div className=" bg-slate-100 h-1/2 w-4/5 xsm:w-4/5 sm:w-4/5 md:w-4/5 lg:w-4/5 flex  justify-evenly  p-5 rounded-xl  shadow-xl gap-5">
          <div className="flex items-center justify-center  w-full h-3/5    sm:w-1/3  md:w-1/3  lg:w-1/3  m-3 rounded-2xl p-4 ">
            <button>
              <Lottie
                className="  h-60 w-60 "
                animationData={User_Icon}
                loop={true}
              />
            </button>
          </div>
          <div className="flex justify-between gap-10 bg-blue-200 w-full h-full xsm:w-full sm:w-full m-3  rounded-xl  p-4 border-blue-400 border-2">
            <div className=" flex flex-col justify-evenly  gap-3 w-full h-full rounded-xl  p-2 ">
              <h3 className="font-bold font-serif mr-2 text-base">
                Name:{" "}
                <span className="font-normal p-3 text-lg">{FullName}</span>
              </h3>
              <h3 className="font-bold font-serif mr-2 text-base">
                Course Name:{" "}
                <span className="font-normal p-3 text-lg">{CourseName}</span>
              </h3>
              <h3 className="font-bold font-serif mr-2 text-base">
                University name:{" "}
                <span className="font-normal p-3 text-lg">
                  {UniversityName}
                </span>
              </h3>
              <hr />
              <h3 className="font-bold font-serif mr-2 text-base">
                Current Locaion:{" "}
                <span className="font-normal p-3 text-lg">
                  {CurrentLocation}
                </span>
              </h3>
              <h3 className="font-bold font-serif mr-2 text-base">
                Gender:{" "}
                <span className="font-normal p-3 text-lg">{Gender}</span>
              </h3>
              <h3 className="font-bold font-serif mr-2 text-base">
                Birtday:<span className="font-normal p-3 text-lg">{DOB}</span>
              </h3>
            </div>
            <div className="">
              <button onClick={() => setShowModal(true)}>
                <i className="ri-edit-2-fill"></i>
              </button>
            </div>
          </div>
        </div>
        <About_You isVisible={showModal} onClose={() => setShowModal(false)} />
        <div className="  h-1 w-4/5 flex   justify-start p-5 rounded-xl ">
          <div className=" flex justify-evenly items-center  gap-8 ">
            <div className="">View and Edit</div>
          </div>
        </div>

        {/* aside */}
        <div className=" h-full flex flex-row w-4/5  gap-6 xsm:w-4/5 sm:w-4/5 md:w-4/5 lg:w-4/5 ">
          <div className=" flex flex-col h-4/5 w-1/5 sm:w-2/5 md:w-2/5 lg:w-2/5 xsm:w-2/5 border-solid rounded-xl bg-slate-50 shadow-lg ">
            <h2 className="m-3">Quick Links</h2>
            <div className=" flex flex-col justify-around h-full gap-10 p-5 m-3  border-solid rounded-xl border-slate-200 border-2 bg-slate-50 ">
              <button
                // onClick={() => setIsOpen(true)}
                className=" flex  justify-center border-blue-300 border-2 hover:bg-blue-500 
              hover:border-2 hover:border-black rounded-lg p-3"
              >
                Education
              </button>
              <button
                className="flex  justify-center border-blue-300 border-2  hover:bg-blue-500 
              hover:border-2 hover:border-black rounded-lg p-3"
              >
                Key Skills
              </button>

              <button
                className="flex  justify-center border-blue-300 border-2  hover:bg-blue-500 
              hover:border-2 hover:border-black rounded-lg p-3"
              >
                certifications
              </button>
              <button
                className="flex  justify-center border-blue-300 border-2  hover:bg-blue-500 
              hover:border-2 hover:border-black rounded-lg p-3"
              >
                interships
              </button>
              <button
                className="flex  justify-center border-blue-300 border-2  hover:bg-blue-500 
              hover:border-2 hover:border-black rounded-lg p-3"
              >
                LinkdIn
              </button>
              <button
                className="flex  justify-center border-blue-300 border-2  hover:bg-blue-500 
              hover:border-2 hover:border-black rounded-lg p-3"
              >
                Github
              </button>
            </div>
          </div>
          {/* all information about the individual is here */}
          <Info_fill />
        </div>
      </div>
    </>
  );
};

export default Display_profile;
