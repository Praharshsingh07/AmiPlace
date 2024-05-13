// utils.js
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "./firebase.config";
import { storeUserResume } from "./firebaseutlils";

export const updateAndStoreUserData = async (dataObject, dataType) => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      await setDoc(userDocRef, { [dataType]: dataObject }, { merge: true });
      console.log(`${dataType} info added successfully`);

      // Call the storeUserResume function after the data is updated
      await storeUserResume();
    } else {
      console.log("User not authenticated");
    }
  } catch (error) {
    console.error(`Error adding ${dataType} info:`, error);
  }
};