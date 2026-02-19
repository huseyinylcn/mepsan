const sqlite3 = require("sqlite3")
const dotenv = require("dotenv").config();
const databasePath = process.env.DB_SQLITE_CONNECTION_STRING.toString();

function createConnection() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(
      databasePath,
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) reject(err);
        else resolve(db);
      },
    );
  });
}




module.exports = createConnection
