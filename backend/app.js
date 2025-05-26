// app.js

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyArUGTPKRwMAS9LZWDbmaNAYayQF5ei5bw",
  authDomain: "ubus-a445a.firebaseapp.com",
  projectId: "ubus-a445a",
  storageBucket: "ubus-a445a.appspot.com",  // fixed typo
  messagingSenderId: "1088324118594",
  appId: "1:1088324118594:web:00dc5b9c4a35c7c246a5db",
  measurementId: "G-NX9Y9J793J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log("Firebase initialized successfully");
