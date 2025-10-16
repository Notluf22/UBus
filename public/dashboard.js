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
    // Fetch matching buses from Supabase
    const { data: buses, error } = await supabase
      .from('buses')
      .select('*')
      .eq('source', from)
      .eq('destination', to);

    if (error) throw error;

    if (!buses || buses.length === 0) {
      resultsDiv.innerHTML = "<p>No buses found for this route.</p>";
    } else {
      // Redirect to results.html with query parameters
      const queryParams = `?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
      window.location.href = 'results.html' + queryParams;
    }

  } catch (error) {
    console.error("Error searching buses:", error);
    resultsDiv.innerHTML = "<p>Error occurred while searching. Please try again.</p>";
  }
}
