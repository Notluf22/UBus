// auth.js
import { auth } from './firebaseConfig.js';
import { RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

let confirmationResult;

window.setupRecaptcha = function () {
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    size: 'invisible',
    callback: (response) => {
      console.log("reCAPTCHA verified");
    }
  }, auth);
};

window.sendOTP = function () {
  const phoneNumber = document.getElementById("phone").value;
  setupRecaptcha();
  const appVerifier = window.recaptchaVerifier;

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((result) => {
      confirmationResult = result;
      alert("OTP sent!");
    })
    .catch((error) => {
      console.error("Error sending OTP:", error);
    });
};

window.verifyOTP = function () {
  const code = document.getElementById("otp").value;
  confirmationResult.confirm(code)
    .then((result) => {
      const user = result.user;
      alert("Login successful!");
      console.log("User signed in:", user);
    })
    .catch((error) => {
      console.error("Error verifying OTP:", error);
      alert("Incorrect OTP");
    });
};
