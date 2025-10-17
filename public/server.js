const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const busesPath = path.join(__dirname, 'buses.json');
const feedbackPath = path.join(__dirname, 'feed.json');

app.use(express.json());
app.use(express.static(__dirname));

app.post('/add-bus', (req, res) => {
  const newBus = req.body;
  fs.readFile(busesPath, (err, data) => {
    let buses = [];
    if (!err && data.length > 0) {
      try {
        buses = JSON.parse(data);
      } catch {
        return res.status(500).send("JSON parse error in buses.json");
      }
    }

    buses.push(newBus);
    fs.writeFile(busesPath, JSON.stringify(buses, null, 2), err => {
      if (err) return res.status(500).send("Failed to save bus");
      res.json({ status: "success" });
    });
  });
});

app.post('/submit-feedback', (req, res) => {
  const newFeedback = req.body;
  fs.readFile(feedbackPath, (err, data) => {
    let feedbacks = [];
    if (!err && data.length > 0) {
      try {
        feedbacks = JSON.parse(data);
      } catch {
        return res.status(500).send("JSON parse error in feedback file");
      }
    }

    feedbacks.push(newFeedback);
    fs.writeFile(feedbackPath, JSON.stringify(feedbacks, null, 2), err => {
      if (err) return res.status(500).send("Failed to save feedback");
      res.json({ status: "success" });
    });
  });
});

app.get('/feedbacks', (req, res) => {
  fs.readFile(feedbackPath, (err, data) => {
    if (err) return res.status(500).send("Failed to read feedbacks");
    try {
      const feedbacks = JSON.parse(data);
      res.json(feedbacks);
    } catch {
      res.status(500).send("JSON parse error in feedback.json");
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
