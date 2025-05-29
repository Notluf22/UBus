import { auth, db, onAuthStateChanged, signOut, collection, getDocs } from './firebase.js';

onAuthStateChanged(auth, (user) => {
  if (user && user.email) {
    document.getElementById('useremail').innerText = `Logged in as: ${user.email}`;
  } else {
    signOut(auth).then(() => {
      window.location.href = "login.html";
    });
  }
});

document.getElementById('swapBtn').addEventListener('click', (event) => {
  event.preventDefault();
  const fromInput = document.getElementById('from');
  const toInput = document.getElementById('to');
  const temp = fromInput.value;
  fromInput.value = toInput.value;
  toInput.value = temp;
});

document.getElementById('searchForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  await searchBuses();
});

async function searchBuses() {
  const from = document.getElementById('from').value.trim();
  const to = document.getElementById('to').value.trim();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (!from || !to) {
    resultsDiv.innerHTML = "<p>Please enter both 'From' and 'To' locations.</p>";
    return;
  }
  if (from.toLowerCase() === to.toLowerCase()) {
    resultsDiv.innerHTML = "<p>'From' and 'To' locations must be different.</p>";
    return;
  }

  try {
    const snapshot = await getDocs(collection(db, "buses"));
    const matchingBuses = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      const route = data.route || [];

      const fromIndex = route.findIndex(stop => stop.toLowerCase() === from.toLowerCase());
      const toIndex = route.findIndex(stop => stop.toLowerCase() === to.toLowerCase());

      if (fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex) {
        matchingBuses.push({
          busnumber: data.busnumber,
          bustype: data.bustype,
          fare: data.fare,
          from,
          to,
          departuretime: data.departuretime,
          arrivaltime: data.arrivaltime
        });
      }
    });

    if (matchingBuses.length === 0) {
      resultsDiv.innerHTML = "<p>No buses found for this route.</p>";
    } else {
      // Store in sessionStorage and redirect
      sessionStorage.setItem('searchResults', JSON.stringify(matchingBuses));
      window.location.href = 'result.html';
    }

  } catch (error) {
    console.error("Error searching buses:", error);
    resultsDiv.innerHTML = "<p>Error occurred while searching. Please try again.</p>";
  }
}
