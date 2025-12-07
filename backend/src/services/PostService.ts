import {prisma} from "../lib/prisma";

export const createPost = async ({content, authorId}: {content: string, authorId: number})=>{
    const post = await prisma.post.create({
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
    })

    return post;
}

export const getAllPosts = async ()=>{
    const posts = await prisma.post.findMany({
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
    })

    return posts;
}

export const getPostById = async (postId: number)=>{
    const post = await prisma.post.findUnique({
        where: {id: postId},
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
   })

    return post;
}

export const updatePost = async (postId: number, authorId: number, newContent: string)=>{
    // First check if post exists and belongs to the author
    const existingPost = await prisma.post.findUnique({
        where: { id: postId }
    });

    if (!existingPost) {
        throw new Error("Post not found");
    }

    if (existingPost.authorId !== authorId) {
        throw new Error("Unauthorized: You can only update your own posts");
    }

    const post = await prisma.post.update({
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
    })

    return post;
}

export const deletePost = async (postId: number, authorId: number)=>{
    // First check if post exists and belongs to the author
    const existingPost = await prisma.post.findUnique({
        where: { id: postId }
    });

    if (!existingPost) {
        throw new Error("Post not found");
    }

    if (existingPost.authorId !== authorId) {
        throw new Error("Unauthorized: You can only delete your own posts");
    }

    const post = await prisma.post.delete({
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
   })

    return post;
}