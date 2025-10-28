const mysql = require('mysql2/promise');
const dbConfig  = require('./dbConfig');

const db = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

// const db = mysql.createConnection({
//   host: dbConfig.host,
//   user: dbConfig.user,
//   password: dbConfig.password,
//   database: dbConfig.database
// });

// db.connect(err => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//         return;
//     }
//     console.log('Connected to MySQL database successfully.');
// });

module.exports = db;