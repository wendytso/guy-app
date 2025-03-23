// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAtRUmyIC7fOb-87fecEuox9fPX_rL0QY",
  authDomain: "biztech-bot.firebaseapp.com",
  projectId: "biztech-bot",
  storageBucket: "biztech-bot.appspot.com",
  messagingSenderId: "490896591225",
  appId: "1:490896591225:web:a304603582bf0bf3a8c7a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);