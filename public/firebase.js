import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
import { getFirestore, collection, doc, getDocs, setDoc, addDoc } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyClyvd-D1Xm414aUsCv7tWvpsxd84r0zos",
  authDomain: "ubus-a445a.firebaseapp.com",
  projectId: "ubus-a445a",
  storageBucket: "ubus-a445a.appspot.com",
  messagingSenderId: "1088324118594",
  appId: "1:1088324118594:web:00dc5b9c4a35c7c246a5db",
  measurementId: "G-NX9Y9J793J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, initializeApp, auth, db, getAuth, doc, setDoc, addDoc, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, collection, getDocs, signInWithEmailAndPassword, getFirestore };
