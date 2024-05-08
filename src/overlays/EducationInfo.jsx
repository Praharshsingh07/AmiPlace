import React from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { EducationInfoAction } from "../store/features/HigerEduInfo/HigerEduInfo.Slice";

const EducationInfo = ({ showModal, onClose }) => {
  if (!showModal) return null;

  const CourseNameInput = useRef();
  const SpecializationInput = useRef();
  const CollegeNameInput = useRef();
  const CGPAInput = useRef();
  const CourseDurationInput = useRef();
  const LinkedinUrlInput = useRef();
  const GitHubUrlInput = useRef();

  const dispatch = useDispatch();

  const handlesubmit = (e) => {
    e.preventDefault();
    const obj = {
      CourseName: CourseNameInput.current.value,
      Specialization: SpecializationInput.current.value,
      CGPA: CGPAInput.current.value,
      CourseDuration: CourseDurationInput.current.value,
      LinkedinUrl: LinkedinUrlInput.current.value,
      GitHubUrl: GitHubUrlInput.current.value,
    };
    dispatch(EducationInfoAction.HandleInputForm2(obj));
    CourseNameInput.current.value = "";
    SpecializationInput.current.value = "";
    CGPAInput.current.value = "";
    CourseDurationInput.current.value = "";
    LinkedinUrlInput.current.value = "";
    GitHubUrlInput.current.value = "";
  };
  return (
    <>
      <div className="fixed inset-0 bg-black  bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <form
          onSubmit={handlesubmit}
          className="mx-auto bg-white m-2 p-5 rounded-lg border-blue-400 border-solid border-2 w-2/5"
        >
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-black ">
              Course Name
            </label>
            <input
              type="text"
              id="base-input"
              name=" Course Name"
              ref={CourseNameInput}
              className="bg-white border   text-sm rounded-lg  block w-full p-2.5  text-black  shadow-md required"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-black ">
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
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-black "
            >
              CGPA
            </label>
            <input
              type="text"
              id="base-input"
              name="CurrentLocation"
              ref={CGPAInput}
              className="bg-white border text-sm rounded-lg  block w-full p-2.5  text-black  shadow-md required"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-black "
            >
              Course duration
            </label>
            <input
              type="text"
              id="base-input"
              name="Gender"
              ref={CourseDurationInput}
              className="bg-white border text-sm rounded-lg  block w-full p-2.5  text-black  shadow-md required"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-black "
            >
              LinkedIn Url
            </label>
            <input
              type="text"
              id="base-input"
              name="DOB"
              ref={LinkedinUrlInput}
              className="bg-white border text-sm rounded-lg  block w-full p-2.5  text-black  shadow-md required"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-black "
            >
              GitHub Url
            </label>
            <input
              type="text"
              id="base-input"
              name="DOB"
              ref={GitHubUrlInput}
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

export default EducationInfo;
