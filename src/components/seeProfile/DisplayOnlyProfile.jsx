import React, { useEffect, useState } from "react";
import Info_fill from "./Info_fill";
import UserBasicInfo from "./UserBasicInfo";
import UserAvatar from "./UserAvatar";
import { db } from "../../firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useLocation } from "react-router-dom";

const DisplayOnlyProfile = () => {
  const location = useLocation();
  const { user } = location.state;
  const [userUID, setUserUID] = useState(null);

  useEffect(() => {
    const fetchUserUID = async () => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", user));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        setUserUID(userDoc.id); // This is the UID
      } else {
        setUserUID(null); // User not found
      }
    };

    fetchUserUID();
  }, [user]);

  // Return null or a loading spinner while fetching userUID
  if (userUID === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-slate-200 sm:w-full md:w-full lg:w-full flex flex-col items-center p-5 m-0 overflow-y-hidden">
      <div className=" bg-slate-100 h-1/2 w-4/5 xsm:w-4/5 sm:w-4/5 md:w-4/5 lg:w-4/5 flex justify-evenly p-5 rounded-xl shadow-xl gap-5 mb-10">
        <UserAvatar userUID={userUID} />
        <UserBasicInfo userUID={userUID} />
      </div>
      <Info_fill userUID={userUID} />
    </div>
  );
};

export default DisplayOnlyProfile;
