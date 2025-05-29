    import { auth, onAuthStateChanged, signOut } from './firebase.js';
    
    // Protect dashboard access
    onAuthStateChanged(auth, (user) => {
      if (user) {
        document.getElementById('useremail').innerText = `Logged in as: ${user.email}`;
      } else {
        // Redirect if not logged in
        window.location.href = "login.html";
      }
    });

    // Logout logic
    document.getElementById("logoutBtn").addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          alert("You have been logged out.");
          window.location.href = "login.html";
        })
        .catch((error) => {
          alert("Logout failed: " + error.message);
        });
    });