const service = require('../services/service');

/**
 * GET /posts
 * Returns all posts.
 */
exports.getAllPosts = async (req, res) => {
  console.log('inside viewallposts fn');
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
  console.log('inside getPostById controller function');

  // Validate route parameter is a positive integer
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
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
 * POST /posts/create
 * Create a new post
 */
exports.createPost = async (req, res) => {
  try {
    console.log('inside createPost controller');
    console.log(req.body);
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

  // Validate route parameter is a positive integer
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

    return res.status(204);
  } catch (error) {
    console.error('Error deleting post:', error.message);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};
