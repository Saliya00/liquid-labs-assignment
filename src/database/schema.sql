CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    title TEXT NOT NULL,
    body TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cache_status(
    id INTEGER PRIMARY KEY,
    is_cache_available INTEGER NOT NULL DEFAULT 0
);

INSERT OR IGNORE INTO cache_status (id, is_cache_available) 
VALUES (1, 0);