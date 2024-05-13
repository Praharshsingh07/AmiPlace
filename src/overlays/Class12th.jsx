import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { auth ,db} from "../firebase.config";
import { collection, addDoc,setDoc,doc } from "firebase/firestore";
import { storeUserResume } from "../firebaseutlils";

import { class12thAction } from "../store/features/Class_Info/Class12thInfo";
import { updateAndStoreUserData } from "../utils";

const Class12th = ({ showModal, onClose }) => {
  if (!showModal) return null;

  const ExaminationBoardInput = useRef();
  const PercentageInput = useRef();
  const PassingYearInput = useRef();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      ExaminationBoard: ExaminationBoardInput.current.value,
      Percentage: PercentageInput.current.value,
      PassingYear: PassingYearInput.current.value,
    };
  
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        await setDoc(userDocRef, { Class12th: obj }, { merge: true });
        console.log('Class 12th info added successfully');
        await updateAndStoreUserData(obj, "Class12th");
        dispatch(class12thAction.HandleInputForm(obj));
        // Clear input fields or any other logic
        ExaminationBoardInput.current.value = '';
        PercentageInput.current.value = '';
        PassingYearInput.current.value = '';
      } else {
        console.log('User not authenticated');
      }
    } catch (error) {
      console.error('Error adding class 12th info:', error);
    }
  };
  return (
    <>
      <div className="fixed inset-0 bg-black  bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white p-5 rounded-lg border-blue-400 border-solid border-2 w-2/5"
        >
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-black ">
              Examinatio board
            </label>
            <input
              type="text"
              id="base-input"
              name=" Course Name"
              ref={ExaminationBoardInput}
              className="bg-white border   text-sm rounded-lg  block w-full p-2.5  text-black  shadow-md required"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label className="block mb-2 text-sm font-medium text-black ">
              Percentage
            </label>
            <input
              type="text"
              id="base-input"
              name="Specialization"
              ref={PercentageInput}
              className="bg-white border text-sm rounded-lg  block w-full p-2.5  text-black  shadow-md required"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-black "
            >
              Passing Year
            </label>
            <input
              type="text"
              id="base-input"
              name="UniversityName"
              ref={PassingYearInput}
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

export default Class12th;
