// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmirVWGISgdwg2hL-BkKFa5H29ojbDjiQ",
  authDomain: "hello-kaffi-hybrid-d68e1.firebaseapp.com",
  projectId: "hello-kaffi-hybrid-d68e1",
  storageBucket: "hello-kaffi-hybrid-d68e1.firebasestorage.app",
  messagingSenderId: "13465566905",
  appId: "1:13465566905:web:f2deaf06c451b32704a568",
  measurementId: "G-M9GM5TMRKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);