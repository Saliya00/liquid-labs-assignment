const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

// Read database file path from env variable or use default if not provided
const dbPath = process.env.DATABASE_PATH || "database.sqlite";

// Create and initialize sqlite database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Failed to connect to database:", err.message);
    } else {
        console.log("Connected to SQLite database");
    }
})

// Read sql schema from file
const schema = fs.readFileSync(
    path.join(__dirname, "schema.sql"),
    "utf8"
);

// Initialize database schema
db.exec(schema, (err) => {
    if (err) {
        console.error("Failed to create tables:", err.message);
    } else {
        console.log("Database schema initialized");
    }
});

module.exports = db;