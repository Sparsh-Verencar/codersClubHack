// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { config, configDotenv } from "dotenv";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
configDotenv()
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6vz736WeWhHzy_cShcDEnRXcawS8Gmsc",
  authDomain: "codersclubhack.firebaseapp.com",
  projectId: "codersclubhack",
  storageBucket: "codersclubhack.firebasestorage.app",
  messagingSenderId: "896464145235",
  appId: "1:896464145235:web:5080a53cf015b757216fa6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
