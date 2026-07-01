-- Create posts table to store data from external api
CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    title TEXT NOT NULL,
    body TEXT NOT NULL
);

-- Create cache_status table to track if data is locally available
CREATE TABLE IF NOT EXISTS cache_status(
    id INTEGER PRIMARY KEY,
    is_cache_available INTEGER NOT NULL DEFAULT 0
);

-- Insert the cache status record
INSERT OR IGNORE INTO cache_status (id, is_cache_available) 
VALUES (1, 0);