import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const LinkedIn = ({userUID}) => {
  const [linkedInInput, setLinkedInInput] = useState("");

  useEffect(() => {
    const fetchLinkedInProfile = async () => {
        const userDocRef = doc(db, "users", userUID);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setLinkedInInput(userDoc.data().linkedinProfile || "");
        }
    };

    fetchLinkedInProfile();
  }, []);

  return (
    <div className="bg-slate-100 border-2 border-blue-400 w-full p-4 h-fit rounded-3xl">
      <div className="text-lg pb-1 flex">
        <div className="mt-2">
          <span className="cursor-text font-semibold ">LinkedIn</span>
        </div>
        <a
          href={linkedInInput}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-10"
        >
          To Profile
        </a>
      </div>
    </div>
  );
};

export default LinkedIn;
