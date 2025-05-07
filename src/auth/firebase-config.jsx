// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaMMwcO8qkHka1uBIsd4OLV7s6t_iXw2U",
  authDomain: "syrizzle-10c16.firebaseapp.com",
  projectId: "syrizzle-10c16",
  storageBucket: "syrizzle-10c16.firebasestorage.app",
  messagingSenderId: "65587000227",
  appId: "1:65587000227:web:34916cdd55622349ba2016",
  measurementId: "G-2HS0STKTDP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);