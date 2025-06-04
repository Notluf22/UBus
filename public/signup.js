import { auth, createUserWithEmailAndPassword } from './firebase.js';

const signupForm = document.getElementById('signupForm');

signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Account created!");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});
