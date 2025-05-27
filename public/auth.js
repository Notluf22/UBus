// auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { app } from "./firebaseConfig.js";

// Initialize Firebase Authentication
const auth = getAuth(app);

// Sign up function
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Login function
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
