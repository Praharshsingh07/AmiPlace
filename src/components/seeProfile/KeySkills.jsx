import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const KeySkills = ({userUID}) => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
      const userDocRef = doc(db, "users", userUID);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const skillsData = userDoc.data().skills || [];
        setSkills(
          skillsData.map((skill) =>
            typeof skill === "string" ? skill : skill.text
          )
        );
      }
  };

  return (
    <div className="bg-slate-100 border-2 w-full border-blue-400 p-4 rounded-3xl">
      <div className="flex justify-start items-center mb-4">
        <h2 className="font-semibold text-xl">Key Skills</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-2 flex items-center justify-between"
          >
            <span className="text-sm font-medium text-gray-700 truncate">
              {skill}
            </span>
          </div>
        ))}
      </div>
      {skills.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No skills added yet!</p>
      )}
    </div>
  );
};

export default KeySkills;
