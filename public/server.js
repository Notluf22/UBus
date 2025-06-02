const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Get all timetables
app.get("/timetables", (req, res) => {
  fs.readFile("timetables.json", (err, data) => {
    if (err) return res.status(500).send("Error reading file");
    res.json(JSON.parse(data));
  });
});

// Add new timetable
app.post("/timetables", (req, res) => {
  fs.readFile("timetables.json", (err, data) => {
    if (err) return res.status(500).send("Error reading file");
    const timetables = JSON.parse(data);
    timetables.push(req.body);
    fs.writeFile("timetables.json", JSON.stringify(timetables, null, 2), (err) => {
      if (err) return res.status(500).send("Error writing file");
      res.send("Timetable added");
    });
  });
});

// Update timetable by routeId
app.put("/timetables/:routeId", (req, res) => {
  fs.readFile("timetables.json", (err, data) => {
    if (err) return res.status(500).send("Error reading file");
    let timetables = JSON.parse(data);
    const index = timetables.findIndex(t => t.routeId == req.params.routeId);
    if (index === -1) return res.status(404).send("Route not found");
    timetables[index] = { ...timetables[index], ...req.body };
    fs.writeFile("timetables.json", JSON.stringify(timetables, null, 2), (err) => {
      if (err) return res.status(500).send("Error writing file");
      res.send("Timetable updated");
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
