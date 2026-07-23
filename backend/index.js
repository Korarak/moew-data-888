const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const { pool, initDB } = require('./db');

// Initialize database
initDB();

// Auth Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied, token missing!' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token is not valid!' });
    req.user = user;
    next();
  });
}

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
    
    // Check if user exists
    const [existing] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existing.length > 0) return res.status(400).json({ error: 'Username already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert user
    await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
    
    // Find user
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    
    const user = rows[0];
    
    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });
    
    // Generate JWT
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Cat Routes
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

app.post('/api/cats', authenticateToken, async (req, res) => {
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

app.put('/api/cats/:id', authenticateToken, async (req, res) => {
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

app.delete('/api/cats/:id', authenticateToken, async (req, res) => {
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
