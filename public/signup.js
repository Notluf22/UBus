// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyClyvd-D1Xm414aUsCv7tWvpsxd84r0zos",
  authDomain: "ubus-a445a.firebaseapp.com",
  projectId: "ubus-a445a",
  storageBucket: "ubus-a445a.appspot.com",
  messagingSenderId: "1088324118594",
  appId: "1:1088324118594:web:00dc5b9c4a35c7c246a5db",
  measurementId: "G-NX9Y9J793J"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
  event.preventDefault()
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert("Creating Account...")
      window.location.href = "login.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
})