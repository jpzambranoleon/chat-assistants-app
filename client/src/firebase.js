// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnv_d_JDyDZ0aYUH65nosJlbpZv1-fckg",
  authDomain: "chatbots-416f6.firebaseapp.com",
  projectId: "chatbots-416f6",
  storageBucket: "chatbots-416f6.appspot.com",
  messagingSenderId: "531468257709",
  appId: "1:531468257709:web:3bab5f0abd3c7d6efe3924",
  measurementId: "G-HWSRS837X7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
