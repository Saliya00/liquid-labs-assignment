const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

// Read database file path from env variable or use default if not provided
const dbPath = process.env.DATABASE_PATH || "database.sqlite";

// Create and initialize sqlite database connection
const connection = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Failed to connect to database:", err.message);
    } else {
        console.log("Connected to SQLite database");
    }
})

// Read SQL schema from file
const schema = fs.readFileSync(
    path.join(__dirname, "schema.sql"),
    "utf8"
);

// Initialize database schema
connection.exec(schema, (err) => {
    if (err) {
        console.error("Failed to create tables:", err.message);
    } else {
        console.log("Database schema initialized");
    }
});

// Execute queries which returns multiple rows of data
function all(sql, params = []) {
    return new Promise((resolve, reject) => {
        connection.all(sql, params, (err, rows) => {
            if (err) {
                return reject(err);
            }

            resolve(rows);
        });
    });
}

// Execute queries which returns multiple rows of data
function get(sql, params = []) {
    console.log("Inside database.js get()")
    return new Promise((resolve, reject) => {
        connection.get(sql, params, (err, row) => {
            if (err) {
                return reject(err);
            }

            resolve(row);
        });
    });
}

// Execute INSERT, UPDATE or DELETE statements.
function run(sql, params = []) {
    return new Promise((resolve, reject) => {
        connection.run(sql, params, function (err) {
            if (err) {
                return reject(err);
            }

            resolve({
                lastID: this.lastID,
                changes: this.changes
            });
        });
    });
}

module.exports = {
    all,
    get,
    run
};