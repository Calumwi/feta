// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC3mBaWnO7dM5BeOexxnp7xgmkVzY3x2U",
  authDomain: "acebook-pic-files.firebaseapp.com",
  projectId: "acebook-pic-files",
  storageBucket: "acebook-pic-files.appspot.com",
  messagingSenderId: "870590506369",
  appId: "1:870590506369:web:7d10960a0021b97e22b480"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)