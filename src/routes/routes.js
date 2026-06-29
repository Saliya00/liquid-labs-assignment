const express = require('express');
const router = express.Router();
const postsController = require('../controllers/controller');

// Get all posts.
router.get('/all', postsController.getAllPosts);

// Get a single post by post ID
router.get('/:id', postsController.getPostById);

// Create a new post
router.post('/', postsController.createPost);

// Delete a post
router.delete('/:id', postsController.deletePost);

module.exports = router;
