// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.MONGO_URI,
  ssl: { rejectUnauthorized: false } // برای Render
});

module.exports = pool;
