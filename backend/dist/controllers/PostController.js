"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostHandler = exports.updatePostHandler = exports.getPostByIdHandler = exports.getAllPostsHandler = exports.createPostHandler = void 0;
const PostService_1 = require("../services/PostService");
const createPostHandler = async (req, res) => {
    try {
        const { content } = req.body;
        const authorId = req.authorId;
        if (!content || typeof content !== "string" || !authorId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }
        const post = await (0, PostService_1.createPost)({ content, authorId });
        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            post
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};
exports.createPostHandler = createPostHandler;
const getAllPostsHandler = async (_, res) => {
    try {
        const posts = await (0, PostService_1.getAllPosts)();
        return res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            posts
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};
exports.getAllPostsHandler = getAllPostsHandler;
const getPostByIdHandler = async (req, res) => {
    try {
        const postId = parseInt(req.params.postId);
        if (isNaN(postId) || postId < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID"
            });
        }
        const post = await (0, PostService_1.getPostById)(postId);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Post fetched successfully",
            post
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};
exports.getPostByIdHandler = getPostByIdHandler;
const updatePostHandler = async (req, res) => {
    try {
        const postId = parseInt(req.params.postId);
        if (isNaN(postId) || postId < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID"
            });
        }
        const authorId = req.authorId;
        if (!authorId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const { content } = req.body;
        if (!content || typeof content !== "string") {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }
        const post = await (0, PostService_1.updatePost)(postId, authorId, content);
        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            post
        });
    }
    catch (error) {
        console.log(error);
        if (error.message === "Post not found") {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
        if (error.message.includes("Unauthorized")) {
            return res.status(403).json({
                success: false,
                message: error.message
            });
        }
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};
exports.updatePostHandler = updatePostHandler;
const deletePostHandler = async (req, res) => {
    try {
        const postId = parseInt(req.params.postId);
        if (isNaN(postId) || postId < 1) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID"
            });
        }
        const authorId = req.authorId;
        if (!authorId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const post = await (0, PostService_1.deletePost)(postId, authorId);
        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            post
        });
    }
    catch (error) {
        console.log(error);
        if (error.message === "Post not found") {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
        if (error.message.includes("Unauthorized")) {
            return res.status(403).json({
                success: false,
                message: error.message
            });
        }
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};
exports.deletePostHandler = deletePostHandler;
//# sourceMappingURL=PostController.js.map