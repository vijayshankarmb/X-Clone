"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPostById = exports.getAllPosts = exports.createPost = void 0;
const prisma_1 = require("../lib/prisma");
const createPost = async ({ content, authorId }) => {
    const post = await prisma_1.prisma.post.create({
        data: {
            content,
            author: {
                connect: {
                    id: authorId
                }
            }
        },
        include: {
            author: {
                select: {
                    id: true,
                    userName: true,
                    avatarUrl: true,
                    name: true
                }
            }
        }
    });
    return post;
};
exports.createPost = createPost;
const getAllPosts = async () => {
    const posts = await prisma_1.prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            author: {
                select: {
                    id: true,
                    userName: true,
                    avatarUrl: true,
                    name: true
                }
            }
        }
    });
    return posts;
};
exports.getAllPosts = getAllPosts;
const getPostById = async (postId) => {
    const post = await prisma_1.prisma.post.findUnique({
        where: { id: postId },
        include: {
            author: {
                select: {
                    id: true,
                    userName: true,
                    avatarUrl: true,
                    name: true
                }
            }
        }
    });
    return post;
};
exports.getPostById = getPostById;
const updatePost = async (postId, authorId, newContent) => {
    // First check if post exists and belongs to the author
    const existingPost = await prisma_1.prisma.post.findUnique({
        where: { id: postId }
    });
    if (!existingPost) {
        throw new Error("Post not found");
    }
    if (existingPost.authorId !== authorId) {
        throw new Error("Unauthorized: You can only update your own posts");
    }
    const post = await prisma_1.prisma.post.update({
        where: {
            id: postId
        },
        data: {
            content: newContent
        },
        include: {
            author: {
                select: {
                    id: true,
                    userName: true,
                    avatarUrl: true,
                    name: true
                }
            }
        }
    });
    return post;
};
exports.updatePost = updatePost;
const deletePost = async (postId, authorId) => {
    // First check if post exists and belongs to the author
    const existingPost = await prisma_1.prisma.post.findUnique({
        where: { id: postId }
    });
    if (!existingPost) {
        throw new Error("Post not found");
    }
    if (existingPost.authorId !== authorId) {
        throw new Error("Unauthorized: You can only delete your own posts");
    }
    const post = await prisma_1.prisma.post.delete({
        where: {
            id: postId
        },
        include: {
            author: {
                select: {
                    id: true,
                    userName: true,
                    avatarUrl: true,
                    name: true
                }
            }
        }
    });
    return post;
};
exports.deletePost = deletePost;
//# sourceMappingURL=PostService.js.map