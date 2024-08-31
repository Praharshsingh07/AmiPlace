import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../firebase.config";

const LikedByUser = ({ username, currentUser }) => {
  const [avatarURL, setAvatarURL] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user UID
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const uid = userDoc.id;
          // Fetch user avatar
          const userDocRef = doc(db, "users", uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData.avatarURL) {
              setAvatarURL(userData.avatarURL);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <Link
      to={username === currentUser ? "/profile" : "/DisplayOnlyProfile"}
      state={{ user: username }}
      className="flex w-full mx-5 my-1 py-1 space-x-2"
    >
      {avatarURL && (
        <img
          src={avatarURL}
          alt={`${username}'s avatar`}
          className="user-image-sidedrawer rounded-full w-8 h-8 border-2 border-blue-300"
        />
      )}
      <span className="font-medium text-lg">{username}</span>
    </Link>
  );
};

export default LikedByUser;
