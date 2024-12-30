
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAWmEAFEJmFw2nRfMqjQAru4yADCM6ULmE",
    authDomain: "todo-6d811.firebaseapp.com",
    projectId: "todo-6d811",
    storageBucket: "todo-6d811.firebasestorage.app",
    messagingSenderId: "186828885828",
    appId: "1:186828885828:web:3451d85f3d721e6f81d111",
    measurementId: "G-MH2E1NYE3J"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
