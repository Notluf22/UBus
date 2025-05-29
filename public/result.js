const resultsDiv = document.getElementById("results");

// Load search results from sessionStorage
const storedResults = sessionStorage.getItem("searchResults");

if (!storedResults) {
  resultsDiv.innerHTML = "<p>No search data found. Please search again from the dashboard.</p>";
} else {
  const buses = JSON.parse(storedResults);

  if (buses.length === 0) {
    resultsDiv.innerHTML = "<p>No buses found for the selected route.</p>";
  } else {
    const list = document.createElement("ul");
    list.style.listStyle = "none";
    list.style.padding = 0;

    buses.forEach((bus) => {
      const item = document.createElement("li");
      item.style.marginBottom = "20px";
      item.style.border = "1px solid #ccc";
      item.style.padding = "15px";
      item.style.borderRadius = "8px";
      item.style.background = "#f9f9f9";
      item.style.color = "#000";

      item.innerHTML = `
        <strong>Bus No:</strong> ${bus.busnumber} <br>
        <strong>Type:</strong> ${bus.bustype} <br>
        <strong>From:</strong> ${bus.from} — <strong>To:</strong> ${bus.to} <br>
        <strong>Departure:</strong> ${bus.departuretime} <br>
        <strong>Arrival:</strong> ${bus.arrivaltime} <br>
        <strong>Fare:</strong> ₹${bus.fare}
      `;

      list.appendChild(item);
    });

    resultsDiv.appendChild(list);
  }
}
