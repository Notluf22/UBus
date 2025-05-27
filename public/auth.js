import { RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { auth } from './firebaseConfig.js';
console.log("auth from firebaseConfig.js:", auth);

let confirmationResult;

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
        auth // ✅ MUST be a valid initialized auth instance
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
