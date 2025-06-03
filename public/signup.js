import { auth, createUserWithEmailAndPassword, updateProfile } from './firebase.js';

const signupForm = document.getElementById('signupForm');

signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Set display name (username)
      return updateProfile(user, {
        displayName: username
      });
    })
    .then(() => {
      alert("Account created!");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});
