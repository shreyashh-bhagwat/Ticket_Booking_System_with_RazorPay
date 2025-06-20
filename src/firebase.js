// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOBK_5U-dI9NOI3G7l9DMXVH19QA3_pBM",
  authDomain: "ticket-booking-with-razorpay.firebaseapp.com",
  projectId: "ticket-booking-with-razorpay",
  storageBucket: "ticket-booking-with-razorpay.firebasestorage.app",
  messagingSenderId: "991747548575",
  appId: "1:991747548575:web:5d40b4db253578fed989aa",
  measurementId: "G-PHBKXK6803"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Export auth for authentication
export const db = getFirestore(app); // Export db for Firestore