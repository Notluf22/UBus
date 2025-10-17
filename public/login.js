import { auth, signInWithEmailAndPassword } from './firebase.js';

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); 

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Logging in...");
      window.location.href = "mainpage.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});
