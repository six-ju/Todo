const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./app.db", (err) => {
  if (err) {
    console.error("Failed to connect to the database:", err.message);
    return;
  }
  console.log("Connected to the SQLite database.");
});

module.exports = db;
