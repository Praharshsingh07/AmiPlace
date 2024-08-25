import { db, auth } from './firebase.config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const storeUserResume = async () => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();

      // Update the user's document with the resume data
      await setDoc(userDocRef, { resume: userData }, { merge: true });
      console.log('User resume stored successfully');
    } else {
      console.log('User not authenticated');
    }
  } catch (error) {
    console.error('Error storing user resume:', error);
  }
};