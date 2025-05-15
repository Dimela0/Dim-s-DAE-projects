// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIDvX9YnYDVjE-0RXVtlpiRwXAP5oJt8g",
  authDomain: "environmental-sustainabi-37bbd.firebaseapp.com",
  projectId: "environmental-sustainabi-37bbd",
  storageBucket: "environmental-sustainabi-37bbd.firebasestorage.app",
  messagingSenderId: "720844755527",
  appId: "1:720844755527:web:3c04786dfc4aa46f5b9762",
  measurementId: "G-BF966X7HXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);