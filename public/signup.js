import { auth, createUserWithEmailAndPassword, getFirestore, updateProfile} from './firebase.js';

const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
  event.preventDefault()
  const username = document.getElementById('username').value.trim(); // Make sure this field exists in HTML
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
