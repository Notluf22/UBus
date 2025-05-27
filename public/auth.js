// auth.js
import { RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { auth } from './firebaseConfig.js';

let confirmationResult;

function setupRecaptcha() {
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    size: 'invisible',
    callback: (response) => {
      console.log("reCAPTCHA verified");
    }
  }, auth);
}

function sendOTP() {
  const phoneNumber = document.getElementById("phone").value;
  const appVerifier = window.recaptchaVerifier;

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((result) => {
      confirmationResult = result;
      alert("OTP sent!");
    })
    .catch((error) => {
      console.error("Error sending OTP:", error);
      alert("Error: " + error.message);
    });
}

function verifyOTP() {
  const code = document.getElementById("otp").value;
  confirmationResult.confirm(code)
    .then((result) => {
      alert("Login successful!");
      console.log("User:", result.user);
    })
    .catch((error) => {
      console.error("Error verifying OTP:", error);
      alert("Incorrect OTP");
    });
}

export { setupRecaptcha, sendOTP, verifyOTP };
