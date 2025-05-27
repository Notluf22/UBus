import { RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { auth } from './firebaseConfig.js';

let confirmationResult; // Define globally for verifyOTP()

function setupRecaptcha() {
  if (!auth) {
    console.error("Firebase auth is not initialized.");
    return;
  }

  if (!window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA verified:", response);
          },
        },
        auth
      );

      window.recaptchaVerifier.render().then((widgetId) => {
        console.log("reCAPTCHA rendered with ID:", widgetId);
        window.recaptchaWidgetId = widgetId;
      });

    } catch (err) {
      console.error("Failed to initialize reCAPTCHA:", err);
    }
  }
}

function sendOTP() {
  const phoneNumber = document.getElementById("phone").value;
  if (!phoneNumber) {
    alert("Please enter a phone number.");
    return;
  }

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
  if (!confirmationResult) {
    alert("OTP not sent yet.");
    return;
  }

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
