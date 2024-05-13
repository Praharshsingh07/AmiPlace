import React, { useRef } from "react";
import { auth ,db} from "../firebase.config";
import { collection, addDoc,setDoc,doc } from "firebase/firestore";
import { storeUserResume } from "../firebaseutlils";
import { useDispatch, useSelector } from "react-redux";
import { KeySkillInfoAction } from "../store/features/Key_Skills/KeySkills_features";
import { updateAndStoreUserData } from "../utils";

const Key_Skills = ({ showModal, onClose }) => {
  if (!showModal) return null;

  const SkillsInput = useRef();
  const dispatch = useDispatch();
  const KeySkills = useSelector((store) => store.KeySkills.skills);

  const AddedSkills = KeySkills.map((skill) => {
    return skill.text && skill.id ? (
      <span key={skill.id}>
        <span className="p-2 m-2 bg-blue-500 rounded-xl">
          {skill.text}
          <button
            className="pl-1 font-bold text-xl hover:text-white"
            onClick={() => dispatch(KeySkillInfoAction.Remove(skill.id))}
          >
            x
          </button>
        </span>
      </span>
    ) : null;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillText = SkillsInput.current.value;
  
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        await setDoc(userDocRef, { KeySkills: skillText }, { merge: true });
        console.log('Key skill added successfully');
        await updateAndStoreUserData(obj, "keySkills");
        dispatch(KeySkillInfoAction.Add(skillText));
        SkillsInput.current.value = '';
      } else {
        console.log('User not authenticated');
      }
    } catch (error) {
      console.error('Error adding key skill:', error);
    }
  };
  return (
    <>
      <div className="fixed inset-0 bg-black  bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div
          className=" max-w-md mx-auto bg-white p-5 rounded-lg border-blue-400 border-solid border-2"
          id="undefined_Modal"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative z-0 w-full mb-5 group">
            <div className="block mb-2 text-xl font-medium text-black">
              <h1 className="title title-20-bold">Key skills</h1>
            </div>
            <h3 className="block font-light text-black pt-0 pl-0 pb-1 p-6">
              Recruiters look for candidates with specific key skills. Add them
              here to appear in searches.
            </h3>
          </div>
          <div className="text-left pl-3">Skills here:{AddedSkills}</div>
          <div className=" items-center m-3">
            <input
              ref={SkillsInput}
              type="text"
              className="bg-white border   text-sm rounded-lg  block w-full p-2.5 mb-3 text-black  shadow-md required"
            />
          </div>
          <br />
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
            onClick={handleSubmit}
          >
            update
          </button>{" "}
          <button
            onClick={() => onClose()}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 "
          >
            cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Key_Skills;
