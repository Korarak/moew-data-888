const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'moew_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function initDB() {
  let retries = 5;
  while (retries > 0) {
    try {
      const connection = await pool.getConnection();
      
      await connection.query(`
        CREATE TABLE IF NOT EXISTS cats (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          gender VARCHAR(20) NOT NULL,
          color VARCHAR(50) NOT NULL,
          age VARCHAR(50) NOT NULL,
          breed VARCHAR(100) NOT NULL,
          address TEXT,
          status VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      
      console.log('Database initialized successfully: "cats" table is ready.');
      connection.release();
      return;
    } catch (err) {
      console.error(`Database not ready yet, retrying... (${retries} attempts left)`);
      retries -= 1;
      // Wait for 3 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  console.error('Could not initialize database after multiple retries.');
}

module.exports = { pool, initDB };
