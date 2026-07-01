const service = require('../services/service');

/**
 * GET /posts
 * Returns all posts.
 */
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await service.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error retrieving posts:', error.message);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};

/**
 * GET /posts/:id
 * Returns a single post by post ID.
 */
exports.getPostById = async (req, res) => {
  // Validate route parameter (post ID) is a positive integer
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: 'Invalid post ID',
    });
  }
  try {
    const post = await service.getPostById(id);

    if (!post) {
      return res.status(404).json({
        error: 'Post not found',
      });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error('Error retrieving post:', error.message);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

/**
 * POST /posts
 * Create a new post
 */
exports.createPost = async (req, res) => {
  try {
    const newPost = await service.createPost(req.body);

    return res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error.message);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

/**
 * DELETE /posts/:id
 * Deletes a post by post ID.
 */
exports.deletePost = async (req, res) => {
  const id = Number(req.params.id);

  // Validate route parameter (post ID) is a positive integer
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: 'Invalid post ID',
    });
  }
  try {
    const deleted = await service.deletePost(id);

    if (!deleted) {
      return res.status(404).json({
        error: 'Post not found',
      });
    }

    return res.status(204).end();
  } catch (error) {
    console.error('Error deleting post:', error.message);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

/**
 * UPDATE /posts/:id
 * Updates a post by post ID.
 */
exports.updatePost = async (req, res) => {
  const postUpdated = await service.updatePost(req.params.id, req.body);
  try {
    if (!postUpdated) {
      return res.status(404).json({
        error: 'Post not found',
      });
    }
    return res.status(200).json(postUpdated);
  } catch (error) {
    console.error('Error updating post:', error.message);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};
