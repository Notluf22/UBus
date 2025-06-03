import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
  event.preventDefault();

  const username = document.getElementById('username').value.trim(); // Make sure this field exists in HTML
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Set displayName to username
      return updateProfile(user, {
        displayName: username
      });
    })
    .then(() => {
      alert("Account created successfully!");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});
