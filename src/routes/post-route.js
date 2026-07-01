const express = require('express');
const router = express.Router();
const postController = require('../controllers/post-controller');
const auth = require('../middleware/auth');

// Get all posts.
router.get('/', auth, postController.getAllPosts);

// Get a single post by post ID
router.get('/:id', auth, postController.getPostById);

// Create a new post
router.post('/', auth, postController.createPost);

// Delete a post
router.delete('/:id', auth, postController.deletePost);

// Update a post
router.put('/:id', auth, postController.updatePost);

module.exports = router;
