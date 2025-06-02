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
    
     async function loadTimetables() {
      const res = await fetch('http://localhost:3000/timetables');
      const data = await res.json();
      const list = document.getElementById('timetableList');
      list.innerHTML = '';
      data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.routeId}: ${item.routeName} (${item.departureTime} to ${item.arrivalTime})`;
        list.appendChild(li);
      });
    }

    async function addTimetable() {
      const body = {
        routeId: document.getElementById('routeId').value,
        routeName: document.getElementById('routeName').value,
        departureTime: document.getElementById('departureTime').value,
        arrivalTime: document.getElementById('arrivalTime').value
      };
      await fetch('http://localhost:3000/timetables', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      });
      loadTimetables();
    }

    async function editTimetable() {
      const routeId = document.getElementById('editRouteId').value;
      const body = {
        departureTime: document.getElementById('newDepartureTime').value,
        arrivalTime: document.getElementById('newArrivalTime').value
      };
      await fetch(`http://localhost:3000/timetables/${routeId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      });
      loadTimetables();
    }

    loadTimetables();