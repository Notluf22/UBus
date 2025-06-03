function showSection(id) {
  document.getElementById("addBusForm").style.display = "none";
  document.getElementById(id).style.display = "block";
}

function submitBus() {
  const newBus = {
    bus_id: document.getElementById("busId").value,
    source: document.getElementById("source").value,
    destination: document.getElementById("destination").value,
    departure_time: document.getElementById("departure").value,
    arrival_time: document.getElementById("arrival").value,
    duration: document.getElementById("duration").value,
    bus_type: document.getElementById("busType").value,
    boarding_point: document.getElementById("boardingPoint").value,
    dropping_point: document.getElementById("droppingPoint").value,
    route: document.getElementById("route").value.split(',').map(stop => stop.trim())
  };

  fetch('/add-bus', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBus)
  })
  .then(res => res.json())
  .then(() => {
    document.getElementById("successMessage").style.display = "block";
    document.querySelectorAll("#addBusForm input, #addBusForm textarea").forEach(el => el.disabled = true);
  })
  .catch(err => alert("Failed to add bus: " + err));
}

function resetForm() {
  document.querySelectorAll("#addBusForm input, #addBusForm textarea").forEach(el => {
    el.disabled = false;
    el.value = '';
  });
  document.getElementById("successMessage").style.display = "none";
}
