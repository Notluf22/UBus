let buses = [];
let feedbacks = [
  "Bus was clean and punctual.",
  "More buses needed during peak time.",
  "Good experience overall."
];

fetch('buses.json')
  .then(res => res.json())
  .then(data => {
    buses = data;
    renderTable();
  });

function renderTable() {
  const tbody = document.getElementById('busTableBody');
  tbody.innerHTML = '';
  buses.forEach((bus, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${bus.bus_id}</td>
        <td>${bus.source}</td>
        <td>${bus.destination}</td>
        <td>${bus.departure_time}</td>
        <td>${bus.arrival_time}</td>
        <td>${bus.bus_type}</td>
        <td>${bus.fare || "-"}</td>
        <td>${bus.route.join(' → ')}</td>
        <td><button onclick="editBus(${i})">Edit</button></td>
      </tr>`;
  });
}

function addBus() {
  const bus = {
    bus_id: document.getElementById("busId").value,
    source: document.getElementById("source").value,
    destination: document.getElementById("destination").value,
    departure_time: document.getElementById("departure").value,
    arrival_time: document.getElementById("arrival").value,
    bus_type: document.getElementById("busType").value,
    fare: document.getElementById("fare").value,
    route: document.getElementById("route").value.split(",").map(p => p.trim())
  };
  buses.push(bus);
  renderTable();
  alert("New bus added (not saved permanently).");
}

function editBus(index) {
  const bus = buses[index];
  document.getElementById("busId").value = bus.bus_id;
  document.getElementById("source").value = bus.source;
  document.getElementById("destination").value = bus.destination;
  document.getElementById("departure").value = bus.departure_time;
  document.getElementById("arrival").value = bus.arrival_time;
  document.getElementById("busType").value = bus.bus_type;
  document.getElementById("fare").value = bus.fare;
  document.getElementById("route").value = bus.route.join(", ");
  buses.splice(index, 1);
}

function renderFeedbacks() {
  const ul = document.getElementById("feedbackList");
  ul.innerHTML = "";
  feedbacks.forEach(f => {
    ul.innerHTML += `<li>${f}</li>`;
  });
}

renderFeedbacks();
