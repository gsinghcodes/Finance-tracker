import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function testConnection() {
  try {
    const pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
    await pool.query('SELECT 1');
    console.log('MySQL connection successful!');
    process.exit(0);
  } catch (err) {
    console.error('MySQL connection failed:', err.message);
    process.exit(1);
  }
}

testConnection();
