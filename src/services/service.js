const axios = require("axios");
const db = require("../database/database")
const BASE_URL = process.env.BASE_URL;

// Fetch all posts while considering the caching logic

exports.getAllPosts = async () => {
    const posts = await db.all("SELECT * FROM posts");

    if (posts.length > 0) {
        return posts;
    }

    const response = await axios.get(BASE_URL);
    const apiPosts = response.data;

    for (const post of apiPosts) {
        await db.run(
            `INSERT INTO posts (id, userId, title, body)
             VALUES (?, ?, ?, ?)`,
            [post.id, post.userId, post.title, post.body]
        );
    }

    return apiPosts;
};

// Fetch single post by post ID
exports.getPostById = async (id) => {

    console.log("inside getPostById service function")
    const post = await db.get(
        "SELECT * FROM posts WHERE id = ?",
        [id]
    );

    if (post) {
        return post;
    }
    console.log(post)

    const response = await axios.get(`${BASE_URL}/${id}`);
    console.log("next step")
    const apiPost = response.data;
    console.log(apiPost)
    if (!apiPost || !apiPost.id) {
        return null;
    }
    console.log("before db.run to update missing")
    await db.run(
        `INSERT INTO posts (id, userId, title, body)
         VALUES (?, ?, ?, ?)`,
        [apiPost.id, apiPost.userId, apiPost.title, apiPost.body]
    );

    return apiPost;
};

