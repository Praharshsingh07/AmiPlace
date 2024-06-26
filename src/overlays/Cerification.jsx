import React, { useRef } from "react";
import { auth ,db} from "../firebase.config";
import { collection, addDoc,setDoc,doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { storeUserResume } from "../firebaseutlils";

import { CertificationInfoAction } from "../store/features/Certification_info/Certification_Info";
import { updateAndStoreUserData } from "../utils";

const Cerification = () => {
  const dispatch = useDispatch();
  const CertificationNameInput = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const certificationName = CertificationNameInput.current.value;
  
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        await setDoc(userDocRef, { certifications: certificationName }, { merge: true });
        console.log('Certification added successfully');
        await updateAndStoreUserData(obj, "certifications");
        dispatch(CertificationInfoAction.HandleInputForm(certificationName));
        CertificationNameInput.current.value = '';
      } else {
        console.log('User not authenticated');
      }
    } catch (error) {
      console.error('Error adding certification:', error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
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
