import React, { useState, useEffect } from "react";
import { db } from "../../firebase.config";
import { doc, getDoc } from "firebase/firestore";

const UserResume = ({ userUID }) => {
  const [resumeUrl, setResumeUrl] = useState("");
  const [fetchStatus, setFetchStatus] = useState("");

  useEffect(() => {
    if (userUID) {
      fetchResume();
    }
  }, [userUID]);

  const fetchResume = async () => {
    setFetchStatus("Fetching resume...");
    try {
      const userDocRef = doc(db, "users", userUID);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (userData.resumeURL) {
          setResumeUrl(userData.resumeURL);
          setFetchStatus("");
        } else {
          setFetchStatus("No resume found for this user");
        }
      } else {
        setFetchStatus("User not found");
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
      setFetchStatus("Error fetching resume");
    }
  };

  const handleDownload = () => {
    if (resumeUrl) {
      window.open(resumeUrl, "_blank");
    }
  };

  return (
    <div className="bg-slate-100 border-2 border-blue-400 h-1/3 w-full p-4 rounded-3xl">
      <h2 className="font-semibold text-lg pb-1">Resume</h2>
      <div className="rounded-lg flex flex-col items-center gap-4 p-4">
        {!resumeUrl && (
          <button
            onClick={fetchResume}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Fetch Resume
          </button>
        )}
        {fetchStatus && (
          <div className="text-sm text-blue-600">{fetchStatus}</div>
        )}
        {resumeUrl && (
          <button
            onClick={handleDownload}
            className="text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Download Resume
          </button>
        )}
      </div>
    </div>
  );
};

export default UserResume;