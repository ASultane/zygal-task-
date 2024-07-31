const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(express.static('public'));

// Load data from JSON file
const loadData = () => {
  const rawData = fs.readFileSync('data.json');
  return JSON.parse(rawData);
};

// Save data to JSON file
const saveData = (data) => {
  const jsonData = JSON.stringify(data);
  fs.writeFileSync('data.json', jsonData);
};

app.get('/data', (req, res) => {
  const data = loadData();
  res.json(data);
});

app.post('/data', (req, res) => {
  const number = req.body.number;
  if (number < 1 || number > 100) {
    return res.status(400).json({ error: 'Number must be between 1 and 100' });
  }
  
  let data = loadData();
  if (data[number]) {
    data[number]++;
  } else {
    data[number] = 1;
  }

  saveData(data);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
