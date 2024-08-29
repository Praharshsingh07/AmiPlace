import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase.config";

export const updateAndStoreUserData = async (data) => {
  const user = auth.currentUser;
  if (!user) return;

  const userDocRef = doc(db, "users", user.uid);

  try {
    await setDoc(userDocRef, data, { merge: true });
    console.log("User data updated successfully");
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};
