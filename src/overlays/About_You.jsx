import React from "react";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { InfoAction } from "../features/About_you_info/AboutYouSlice";

const About_You = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const dispatch = useDispatch();
  const FullNameInput = useRef();
  const CourseNameInput = useRef();
  const UniversityNameInput = useRef();
  const CurrentLocationInput = useRef();
  const GenderInput = useRef();
  const DOBInput = useRef();
  const LinkedinUrlInput = useRef();
  const GitHubUrlInput = useRef();

  const handlesubmit = (e) => {
    e.preventDefault();
    const obj = {
      FullName: FullNameInput.current.value,
      CourseName: CourseNameInput.current.value,
      UniversityName: UniversityNameInput.current.value,
      CurrentLocation: CurrentLocationInput.current.value,
      Gender: GenderInput.current.value,
      DOB: DOBInput.current.value,
    };
    dispatch(InfoAction.HandleInputForm(obj));
    FullNameInput.current.value = "";
    CourseNameInput.current.value = "";
    UniversityNameInput.current.value = "";
    CurrentLocationInput.current.value = "";
    GenderInput.current.value = "";
    DOBInput.current.value = "";
    LinkedinUrlInput.current.value = "";
    GitHubUrlInput.current.value = "";
  };

  return (
    <>
      <div className=" fixed inset-0 bg-black  bg-opacity-25 backdrop-blur-sm flex justify-center items-center ">
        <form
          id="AboutYouForm"
          onSubmit={handlesubmit}
          className="w-2/5 max-w-md mx-auto bg-white p-5 rounded-lg border-blue-400 border-solid border-2  "
        >
          <div className=" relative w-full mb-5 group  ">
            <label className="block mb-2 text-sm font-medium text-black ">
              Full Name
            </label>
            <input
              type="text"
              id="base-input"
              name="FullName"
              ref={FullNameInput}
              className="bg-white border   text-sm rounded-lg  block w-full p-2.5  text-black  shadow-md required"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-black ">
              Course Name
            </label>
            <input
              type="text"
              id="base-input"
              name="CourseName"
              ref={CourseNameInput}
              className="bg-white border text-sm rounded-lg  block w-full p-2.5  text-black  shadow-md required"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-black "
            >
              University name
            </label>
            <input
              type="text"
              id="base-input"
              name="UniversityName"
              ref={UniversityNameInput}
              className="bg-white border text-sm rounded-lg  block w-full p-2.5  text-black  shadow-md required"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-black "
            >
              Current Location
            </label>
            <input
              type="text"
              id="base-input"
              name="CurrentLocation"
              ref={CurrentLocationInput}
              className="bg-white border text-sm rounded-lg  block w-full p-2.5  text-black  shadow-md required"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-black "
            >
              Gender
            </label>
            <input
              type="text"
              id="base-input"
              name="Gender"
              ref={GenderInput}
              className="bg-white border text-sm rounded-lg  block w-full p-2.5  text-black  shadow-md required"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-black "
            >
              Date of Birth (DD/MM/YYYY)
            </label>
            <input
              type="text"
              id="base-input"
              name="DOB"
              ref={DOBInput}
              className="bg-white border text-sm rounded-lg  block w-full p-2.5  text-black  shadow-md required"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update
          </button>{" "}
          <button
            onClick={() => onClose()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 "
          >
            cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default About_You;
