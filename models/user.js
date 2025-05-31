const pool = require('../models/db.js');

async function findUserBycodemeli(codemeli) {
  const res = await pool.query('SELECT * FROM users WHERE codemeli = $1', [codemeli]);
  return res.rows[0];
}

async function createUser(codemeli,email, hashedPassword) {
  await pool.query(
    'INSERT INTO users (codemeli,email, passwrd) VALUES ($1,$2,$3)',
    [codemeli,email, hashedPassword]
  );
}

async function findUserByshkhadmat(rkhadamat,codemeli) {
  const res = await pool.query('SELECT * FROM rkhadamat WHERE shkhadamat = $1 AND codemeli = $2',
  [rkhadamat, codemeli]
);

  return res.rows;
}



module.exports = { findUserBycodemeli, createUser,findUserByshkhadmat};
