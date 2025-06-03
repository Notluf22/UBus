const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const busesPath = path.join(__dirname, 'buses.json');

app.use(express.json());
app.use(express.static(__dirname)); // ✅ Serves your HTML file

app.post('/add-bus', (req, res) => {
  const newBus = req.body;
  fs.readFile(busesPath, (err, data) => {
    let buses = [];
    if (!err && data.length > 0) {
      try {
        buses = JSON.parse(data);
      } catch (e) {
        return res.status(500).send("JSON parse error");
      }
    }

    buses.push(newBus);
    fs.writeFile(busesPath, JSON.stringify(buses, null, 2), err => {
      if (err) return res.status(500).send("Failed to save bus");
      res.json({ status: "success" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
