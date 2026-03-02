const sqlite3 = require("sqlite3");
const dotenv = require("dotenv").config();

let dbInstance = null;

async function getDbConnection() {
  if (dbInstance) return dbInstance; 

  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(
      process.env.DB_SQLITE_CONNECTION_STRING,
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          reject(err);
        } else {
          dbInstance = db; 
          resolve(db);
        }
      }
    );
  });
}


module.exports = { getDbConnection };