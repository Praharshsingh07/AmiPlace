import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { auth ,db} from "../firebase.config";
import { collection, addDoc,setDoc,doc } from "firebase/firestore";
import { storeUserResume } from "../firebaseutlils";
import { updateAndStoreUserData } from "../utils";
const Internship = ({ showModal, onClose }) => {
  if (!showModal) return null;
  const CompanyNameInput = useRef();
  const InternshipdurationInput = useRef();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      CompanyName: CompanyNameInput.current.value,
      Internshipduration: InternshipdurationInput.current.value,
    };
  
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        await setDoc(userDocRef, { Internship: obj }, { merge: true });
        console.log('Internship info added successfully');
        await updateAndStoreUserData(obj, "Internship");

        // Clear input fields or any other logic
        CompanyNameInput.current.value = '';
        InternshipdurationInput.current.value = '';
      } else {
        console.log('User not authenticated');
      }
    } catch (error) {
      console.error('Error adding internship info:', error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black  bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className=" m-2 w-2/5 mx-auto bg-white p-5 rounded-lg border-blue-400 border-solid border-2"
        >
          <h1 className="block text-2xl font-bold text-black pt-0 pl-2 p-6">
            Internships
          </h1>
          <h3 className="block font-light text-black pt-0 pl-2 p-6">
            Show your professional learnings
          </h3>
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-black ">
              Company Name
            </label>
            <input
              type="text"
              id="base-input"
              name=" Course Name"
              ref={CompanyNameInput}
              className="bg-white border   text-sm rounded-lg  block w-full p-2.5  text-black  shadow-md required"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-black ">
              Internship duration (MM/YY)
            </label>
            <input
              type="text"
              id="base-input"
              name=" Course Name"
              ref={InternshipdurationInput}
              className="bg-white border   text-sm rounded-lg  block w-full p-2.5  text-black  shadow-md required"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-black ">
              Project name
            </label>
            <input
              type="text"
              id="base-input"
              name=" Course Name"
              className="bg-white border   text-sm rounded-lg  block w-full p-2.5  text-black  shadow-md required"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-black ">
              Describe what you did at internship
            </label>
            <textarea
              name=""
              id=""
              cols="15"
              rows="3"
              className="bg-white  text-sm rounded-lg  block w-full p-2.5  text-black  shadow-md required border-slate-200 border-2"
            ></textarea>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-black "
            >
              Project URL (optional)
            </label>
            <input
              type="text"
              id="base-input"
              name="UniversityName"
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
            type="submit"
            onClick={() => onClose()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700"
          >
            cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default Internship;
