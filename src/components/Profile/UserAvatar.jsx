import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import User_Icon from "../../assest/user_Icon.json";
import { updateAndStoreUserData } from "../../utils";
import { storage, auth, db } from "../../firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";

const UserAvatar = () => {
  const [avatarURL, setAvatarURL] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    const fetchAvatarURL = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.avatarURL) {
            setAvatarURL(userData.avatarURL);
          }
        }
      }
    };

    fetchAvatarURL();
  }, []);

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const storageRef = ref(
      storage,
      `avatars/${auth.currentUser.uid}/${file.name}`
    );
    try {
      setUploadError(null);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      await updateAndStoreUserData({ avatarURL: downloadURL });
      setAvatarURL(downloadURL);
      console.log("Avatar uploaded successfully");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setUploadError("Failed to upload avatar. Please try again.");
    }
  };

  return (
    <div className="items-center justify-center w-full h-3/5 sm:w-1/3 md:w-1/3 lg:w-1/3 m-3 rounded-2xl p-4">
      <div className="user_profile_img">
        {avatarURL ? (
          <img
            src={avatarURL}
            alt="User Avatar"
            className="h-60 w-60 rounded-full object-cover"
          />
        ) : (
          <Lottie className="h-60 w-60" animationData={User_Icon} loop={true} />
        )}
      </div>
      <div className="w-full flex flex-col items-center">
        <label
          htmlFor="userProfileImage"
          className="mx-auto text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-400 rounded-lg text-xs sm:w-auto px-2 py-1.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-600"
        >
          Update Avatar
        </label>
        <input
          type="file"
          name="user_profile_image"
          id="userProfileImage"
          className="text-xs hidden"
          accept="image/*"
          onChange={handleAvatarUpload}
        />
        {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
      </div>
    </div>
  );
};

export default UserAvatar;
