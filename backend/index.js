const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/cats', (req, res) => {
  res.json({ message: 'Get all cats' });
});

app.post('/api/cats', (req, res) => {
  res.json({ message: 'Create a cat' });
});

app.get('/api/cats/:id', (req, res) => {
  res.json({ message: `Get cat ${req.params.id}` });
});

app.put('/api/cats/:id', (req, res) => {
  res.json({ message: `Update cat ${req.params.id}` });
});

app.delete('/api/cats/:id', (req, res) => {
  res.json({ message: `Delete cat ${req.params.id}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
