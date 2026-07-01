const db = require('../database/database');
const BASE_URL = process.env.BASE_URL;

// Fetch all posts while considering the caching logic
exports.getAllPosts = async () => {
  const cache = await db.get('SELECT is_cache_available FROM cache_status WHERE id = 1');

  if (!cache.is_cache_available) {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const apiPosts = await response.json();

    for (const post of apiPosts) {
      await db.run(
        `INSERT OR IGNORE INTO posts (id, title, body)
             VALUES (?, ?, ?)`,
        [post.id, post.title, post.body],
      );
    }

    await db.run(
      `UPDATE cache_status
       SET is_cache_available = 1
       WHERE id = 1`,
    );
    return apiPosts;
  }

  return await db.all(`SELECT id, title, body FROM posts`);
};

// Fetch a single post by post ID from external api if not cached in the local database
exports.getPostById = async (id) => {
  // Return post if found in local database
  const post = await db.get('SELECT id, title, body FROM posts WHERE id = ?', [id]);
  if (post) {
    return post;
  }

  const response = await fetch(`${BASE_URL}/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const apiPost = await response.json();

  await db.run(
    `INSERT INTO posts (id, title, body)
     VALUES (?, ?, ?)`,
    [apiPost.id, apiPost.title, apiPost.body],
  );

  return apiPost;
};

// Create a new post in local database
exports.createPost = async (post) => {
  const result = await db.run(
    `INSERT INTO posts (title, body)
     VALUES (?, ?)`,
    [post.title, post.body],
  );

  return {
    id: result.lastID,
    ...post,
  };
};

// Delete a post by post ID in local database
exports.deletePost = async (id) => {
  const result = await db.run(`DELETE FROM posts WHERE id = ?`, [id]);
  return result.changes > 0;
};

// Update a post by post ID in local database
exports.updatePost = async (id, post) => {
  const result = await db.run(
    `UPDATE posts 
    SET title = ?,
        body = ? 
    WHERE id=?`,
    [post.title, post.body, id],
  );
  if (result.changes === 0) {
    return null;
  }
  return await db.get(`SELECT id, title, body FROM posts WHERE id = ?`, [id]);
};
