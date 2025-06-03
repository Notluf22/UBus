import { auth } from './firebase.js';
import { updatePassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const form = document.getElementById('changePasswordForm');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (newPassword !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  const user = auth.currentUser;
  if (user) {
    try {
      await updatePassword(user, newPassword);
      alert("Password changed successfully!");
      window.location.href = "dashboard.html";
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        alert("You need to log in again to change your password.");
        window.location.href = "login.html"; // or show re-auth modal
      } else {
        alert(error.message);
      }
    }
  } else {
    alert("No user is currently signed in.");
  }
});
