const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const PORT = 3000;
const DATA_FILE = path.join(__dirname, "public", "feedback.json");

app.use(express.static("public"));
app.use(express.json());

// Handle feedback submission
app.post("/submit-feedback", (req, res) => {
  const { name, feedback, rating } = req.body;

  if (!name || !feedback || !rating) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const entry = { name, feedback, rating, timestamp: new Date().toISOString() };

  let data = [];
  if (fs.existsSync(DATA_FILE)) {
    data = JSON.parse(fs.readFileSync(DATA_FILE));
  }

  data.push(entry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.status(200).json({ message: "Feedback saved" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
