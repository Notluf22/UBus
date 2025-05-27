// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";

// Your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyClyvd-D1Xm414aUsCv7tWvpsxd84r0zos",
  authDomain: "ubus-a445a.firebaseapp.com",
  projectId: "ubus-a445a",
  storageBucket: "ubus-a445a.appspot.com",
  messagingSenderId: "1088324118594",
  appId: "1:1088324118594:web:00dc5b9c4a35c7c246a5db",
  measurementId: "G-NX9Y9J793J"
};

// Initialize and export Firebase app
export const app = initializeApp(firebaseConfig);
