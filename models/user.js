const pool = require('../models/db.js');

async function findUserByEmail(codemeli) {
  const res = await pool.query('SELECT * FROM users WHERE codemeli = $1', [codemeli]);
  return res.rows[0];
}

async function createUser(codemeli,email, hashedPassword) {
  await pool.query(
    'INSERT INTO users (codemeli,email, passwrd) VALUES ($1,$2,$3)',
    [codemeli,email, hashedPassword]
  );
}

module.exports = { findUserByEmail, createUser };
