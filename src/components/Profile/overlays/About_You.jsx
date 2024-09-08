import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { updateAndStoreUserData } from "../../../utils";

const About_You = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const dispatch = useDispatch();
  const FullNameInput = useRef();
  const CourseInput = useRef();
  const BranchInput = useRef();
  const SemisterInput = useRef();
  const SpecializationInput = useRef();
  const [gender, setGender] = useState("");
  const DOBInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      FullName: FullNameInput.current.value,
      Course: CourseInput.current.value,
      Branch: BranchInput.current.value,
      Semister: SemisterInput.current.value,
      Specialization: SpecializationInput.current.value,
      Gender: gender,
      DOB: DOBInput.current.value,
    };
    updateAndStoreUserData(userData);
    onClose();
  };

  return (
    <>
      <div className=" fixed inset-0 bg-black  bg-opacity-25 backdrop-blur-sm flex justify-center items-center ">
        <form
          id="AboutYouForm"
          onSubmit={handleSubmit}
          className="w-[35%] mx-auto h-[70%] overflow-y-auto bg-white px-5 pb-5 rounded-lg"
        >
          <div className="z-10 h-10 py-3 bg-white control flex justify-end sticky top-0">
            <button
              className="close_overlay items-center"
              onClick={() => onClose()}
            >
              <RxCross2 />
            </button>
          </div>
          <div className=" relative w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-black">
              Full Name
            </label>
            <input
              type="text"
              id="base-input"
              name="FullName"
              ref={FullNameInput}
              className="bg-white border text-sm rounded-lg block w-full p-2.5 text-black shadow-md required"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-black">
              Course
            </label>
            <select
              id="base-input"
              name="Course"
              ref={CourseInput}
              className="bg-white border text-sm rounded-lg block w-full p-2.5 text-black shadow-md required"
            >
              <option value="B.Tech">B.Tech</option>
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-black">
              Branch
            </label>
            <select
              id="base-input"
              name="Branch"
              ref={BranchInput}
              className="bg-white border text-sm rounded-lg block w-full p-2.5 text-black shadow-md required"
            >
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="Chemical">Chemical</option>
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-black">
              Semister
            </label>
            <select
              id="base-input"
              name="Semister"
              ref={SemisterInput}
              className="bg-white border text-sm rounded-lg block w-full p-2.5 text-black shadow-md required"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-black "
            >
              Specialization
            </label>
            <input
              type="text"
              id="base-input"
              name="Specialization"
              ref={SpecializationInput}
              className="bg-white border text-sm rounded-lg  block w-full p-2.5  text-black  shadow-md required"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group space-x-2">
            <span className="block mb-2 text-sm font-medium text-black">
              Gender
            </span>
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="male"
              name="Gender"
              value="Male"
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="female">Female</label>
            <input
              type="radio"
              id="female"
              name="Gender"
              value="Female"
              onChange={(e) => setGender(e.target.value)}
            />
            <label htmlFor="other">Other</label>
            <input
              type="radio"
              id="other"
              name="Gender"
              value="Other"
              onChange={(e) => setGender(e.target.value)}
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
              type="date"
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
            type="reset"
            className="text-white bg-gray-400 hover:bg-gray-500 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-400 dark:hover:bg-gray-500 "
          >
            Reset
          </button>
        </form>
      </div>
    </>
  );
};

export default About_You;
