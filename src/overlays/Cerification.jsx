import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { CertificationInfoAction } from "../features/Certification_info/Certification_Info";

const Cerification = () => {
  const dispatch = useDispatch();
  const CertificationNameInput = useRef();
  const handlesubmit = (e) => {
    e.preventDefault();
    const obj = {
      certificationName: CertificationNameInput.current.value,
    };
    dispatch(CertificationInfoAction.Add(obj));
    CertificationNameInput.current.value = "";
  };
  return (
    <>
      <form
        onSubmit={handlesubmit}
        className="max-w-md mx-auto bg-white p-5 rounded-lg border-blue-400 border-solid border-2"
      >
        <h1 className="block text-2xl font-bold text-black pt-0 pl-2 p-6">
          Certification
        </h1>
        <h3 className="block font-light text-black pt-0 pl-2 p-6">
          Add details of your certification.
        </h3>
        <div className="relative z-0 w-full mb-5 group">
          <label className="block mb-2 text-sm font-medium text-black ">
            Certification Name
          </label>
          <input
            type="text"
            id="base-input"
            name=" Course Name"
            ref={CertificationNameInput}
            className="bg-white border   text-sm rounded-lg  block w-full p-2.5  text-black  shadow-md required"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-2"
        >
          Update
        </button>{" "}
        <button
          type="submit"
          className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700"
        >
          cancel
        </button>
      </form>
    </>
  );
};

export default Cerification;
