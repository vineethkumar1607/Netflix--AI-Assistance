// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQo0ouQpPVDBvSi_E9qmMfE_9Ees2T2Pc",
  authDomain: "netflix-gpt-c9b06.firebaseapp.com",
  projectId: "netflix-gpt-c9b06",
  storageBucket: "netflix-gpt-c9b06.firebasestorage.app",
  messagingSenderId: "763433607827",
  appId: "1:763433607827:web:d4798e05b885f3d9dfa366",
  measurementId: "G-6C2HVY5L1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
