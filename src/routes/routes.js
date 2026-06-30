const express = require('express');
const router = express.Router();
const postsController = require('../controllers/controller');

// Get all posts.
router.get('/', postsController.getAllPosts);

// Get a single post by post ID
router.get('/:id', postsController.getPostById);

// Create a new post
router.post('/', postsController.createPost);

// Delete a post
router.delete('/:id', postsController.deletePost);

// Update a post
router.put('/:id', postsController.updatePost);

module.exports = router;
