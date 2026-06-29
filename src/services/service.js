const axios = require('axios');
const db = require('../database/database');
const BASE_URL = process.env.BASE_URL;

// Fetch all posts while considering the caching logic
exports.getAllPosts = async () => {
  const posts = await db.all('SELECT * FROM posts');

  if (posts.length > 0) {
    return posts;
  }

  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  console.log(response);
  const apiPosts = await response.json();

  for (const post of apiPosts) {
    await db.run(
      `INSERT INTO posts (id, userId, title, body)
             VALUES (?, ?, ?, ?)`,
      [post.id, post.userId, post.title, post.body],
    );
  }

  return apiPosts;
};

// Fetch single post by post ID
exports.getPostById = async (id) => {
  // Return post if found in local database
  const post = await db.get('SELECT * FROM posts WHERE id = ?', [id]);
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
    `INSERT INTO posts (id, userId, title, body)
     VALUES (?, ?, ?, ?)`,
    [apiPost.id, apiPost.userId, apiPost.title, apiPost.body],
  );

  return apiPost;
};

// Create a new post
exports.createPost = async (post) => {
  console.log(post.userId, post.title, post.body);
  const result = await db.run(
    `INSERT INTO posts (userId, title, body)
     VALUES (?, ?, ?)`,
    [post.userId, post.title, post.body],
  );

  return {
    id: result.lastID,
    ...post,
  };
};

// Delete a post by post ID
exports.deletePost = async (id) => {
  const result = await db.run(`DELETE FROM posts WHERE id = ?`, [id]);
  console.log(result);
  return result.changes > 0;
};
