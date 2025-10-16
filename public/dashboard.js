document.getElementById('searchForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  await searchBuses();
});

document.getElementById('swapBtn').addEventListener('click', () => {
  const fromInput = document.getElementById('from');
  const toInput = document.getElementById('to');
  [fromInput.value, toInput.value] = [toInput.value, fromInput.value];
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
    // Fetch all buses from Supabase
    const { data: buses, error } = await supabase.from('buses').select('*');
    if (error) throw error;

    const matchingBuses = buses.filter(bus => {
      const busSource = bus.source.toLowerCase();
      const busDest = bus.destination.toLowerCase();
      return busSource === from.toLowerCase() && busDest === to.toLowerCase();
    });

    if (matchingBuses.length === 0) {
      resultsDiv.innerHTML = "<p>No buses found for this route.</p>";
    } else {
      // Store results in sessionStorage for the results page
      sessionStorage.setItem('searchResults', JSON.stringify(matchingBuses));
      window.location.href = 'results.html';
    }

  } catch (error) {
    console.error("Error searching buses:", error);
    resultsDiv.innerHTML = "<p>Error occurred while searching. Please try again.</p>";
  }
}
