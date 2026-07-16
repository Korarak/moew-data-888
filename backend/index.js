const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const { pool, initDB } = require('./db');

// Initialize database
initDB();

// Routes
app.get('/api/cats', async (req, res) => {
  try {
    const { search, gender, status } = req.query;
    let query = 'SELECT * FROM cats WHERE 1=1';
    let queryParams = [];

    if (search) {
      query += ' AND (name LIKE ? OR breed LIKE ? OR color LIKE ?)';
      const searchPattern = `%${search}%`;
      queryParams.push(searchPattern, searchPattern, searchPattern);
    }
    if (gender) {
      query += ' AND gender = ?';
      queryParams.push(gender);
    }
    if (status) {
      query += ' AND status = ?';
      queryParams.push(status);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.query(query, queryParams);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/cats', async (req, res) => {
  try {
    const { name, gender, color, age, breed, address, status } = req.body;
    const [result] = await pool.query(
      'INSERT INTO cats (name, gender, color, age, breed, address, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, gender, color, age, breed, address, status]
    );
    res.status(201).json({ id: result.insertId, message: 'Cat added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/cats/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cats WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Cat not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.put('/api/cats/:id', async (req, res) => {
  try {
    const { name, gender, color, age, breed, address, status } = req.body;
    const [result] = await pool.query(
      'UPDATE cats SET name = ?, gender = ?, color = ?, age = ?, breed = ?, address = ?, status = ? WHERE id = ?',
      [name, gender, color, age, breed, address, status, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Cat not found' });
    res.json({ message: 'Cat updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.delete('/api/cats/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM cats WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Cat not found' });
    res.json({ message: 'Cat deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
