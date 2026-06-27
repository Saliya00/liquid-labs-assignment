const service = require("../services/service");

/**
 * GET /posts
 * Returns all posts.
 */
exports.getAllPosts = async (req, res) => {
    console.log("inside viewallposts fn")
    try {
        const posts = await service.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error retrieving posts:", error.message);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};

/**
 * GET /posts/:id
 * Returns a single post by post ID.
 */
exports.getPostById = async (req, res) => {
    console.log("inside getPostById controller function")
    try {
        const post = await service.getPostById(req.params.id);

        if (!post) {
            return res.status(404).json({
                error: "Post not found"
            });
        }

        res.status(200).json(post);

    } catch (error) {
        console.error("Error retrieving post:", error.message);
        res.status(500).json({
            error: "Internal server error"
        });
    }
};
