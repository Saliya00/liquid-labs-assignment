const express = require('express');
const router = express.Router();
const postsController = require('../controllers/controller');
const auth = require('../middleware/auth');

// Get all posts.
router.get('/', auth, postsController.getAllPosts);

// Get a single post by post ID
router.get('/:id', auth, postsController.getPostById);

// Create a new post
router.post('/', auth, postsController.createPost);

// Delete a post
router.delete('/:id', auth, postsController.deletePost);

// Update a post
router.put('/:id', auth, postsController.updatePost);

module.exports = router;
