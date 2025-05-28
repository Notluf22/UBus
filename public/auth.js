// auth.js
import { auth, db } from "./firebaseConfig.js";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Setup reCAPTCHA verifier (call this before sending OTP)
export function setupRecaptcha() {
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    size: 'invisible',
    callback: () => {
      console.log("reCAPTCHA solved");
    }
  }, auth);
}

// Send OTP to user's phone number
export async function sendOTP(phoneNumber) {
  if (!window.recaptchaVerifier) {
    setupRecaptcha();
  }

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
    return confirmationResult;
  } catch (error) {
    throw new Error("Failed to send OTP: " + error.message);
  }
}

// Verify the OTP entered by the user
export async function verifyOTP(confirmationResult, otp) {
  try {
    const result = await confirmationResult.confirm(otp);
    return result.user; // returns Firebase user object
  } catch (error) {
    throw new Error("Incorrect OTP: " + error.message);
  }
}

// Password hashing utility (SHA-256)
export async function hashPassword(password) {
  const buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Fetch user data from Firestore by UID
export async function getUserData(uid) {
  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);
  if (!userDoc.exists()) {
    return null;
  }
  return userDoc.data();
}

export { auth, db };
