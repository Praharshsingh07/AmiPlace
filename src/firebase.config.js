// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS5syiZXCHaSlqA8goDDozgh-upgFGdis",
  authDomain: "amiplace-3c576.firebaseapp.com",
  projectId: "amiplace-3c576",
  storageBucket: "amiplace-3c576.appspot.com",
  messagingSenderId: "835524893178",
  appId: "1:835524893178:web:96d2de7b8c7c3bbcde2c43",
  measurementId: "G-MEVFD068W3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export {db};
export const auth = getAuth();