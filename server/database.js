

const mysql = require("mysql2");
require('dotenv').config();

let db;

function handleDisconnect() {
  db = mysql.createConnection({
  host: "localhost",
    user: "unicx",
  password: "StrongPass123!",
  database: "unicxdb"
});
  

  db.connect((err) => {
    if (err) {
      console.error("Database connection failed: ", err);
      setTimeout(handleDisconnect, 2000); // Retry after 2s
    } else {
      console.log("Connected to MySQL database.");
    }
  });

  db.on("error", (err) => {
    console.error("MySQL error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST" || err.fatal) {
      handleDisconnect(); // Reconnect
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = db;
