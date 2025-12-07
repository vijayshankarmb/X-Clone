import { Request, Response } from "express";
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from "../services/PostService";

interface AuthRequest extends Request{
    authorId?: number;
}

export const createPostHandler = async (req: AuthRequest, res: Response)=>{
    try{
        const {content} = req.body;

        const authorId = req.authorId;

        if (!content || typeof content !== "string" || !authorId){
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            })
        }

        const post = await createPost({content, authorId});

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            post
        })

    } catch(error: any){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        })
    }
}

export const getAllPostsHandler = async (_: Request, res: Response)=>{
    try{
        const posts = await getAllPosts();

        return res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            posts
        })
    } catch(error: any){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        })
    }
}

export const getPostByIdHandler = async (req: Request, res: Response)=>{
    try{
        const postId = parseInt(req.params.postId);

        if (isNaN(postId) || postId < 1){
            return res.status(400).json({
                success: false,
                message: "Invalid post ID"
            })
        }
        const post = await getPostById(postId);

        if (!post){
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Post fetched successfully",
            post
        })
    }
    catch(error: any){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        })
    }
}

export const updatePostHandler = async (req: AuthRequest, res: Response)=>{
    try{
        const postId = parseInt(req.params.postId);

        if (isNaN(postId) || postId < 1){
            return res.status(400).json({
                success: false,
                message: "Invalid post ID"
            })
        }

        const authorId = req.authorId;

        if (!authorId){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const {content} = req.body;

        if (!content || typeof content !== "string"){
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            })
        }

        const post = await updatePost(postId, authorId, content);

        return res.status(200).json({
            success: true,
            message: "Post updated successfully",
            post
        })
    } catch(error: any){
        console.log(error)
        if (error.message === "Post not found") {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }
        if (error.message.includes("Unauthorized")) {
            return res.status(403).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        })
    }
}

export const deletePostHandler = async (req: AuthRequest, res: Response)=>{
    try{
        const postId = parseInt(req.params.postId);

        if (isNaN(postId) || postId < 1){
            return res.status(400).json({
                success: false,
                message: "Invalid post ID"
            })
        }

        const authorId = req.authorId;

        if (!authorId){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const post = await deletePost(postId, authorId);

        return res.status(200).json({
            success: true,
            message: "Post deleted successfully",
            post
        })
    } catch(error: any){
        console.log(error)
        if (error.message === "Post not found") {
            return res.status(404).json({
                success: false,
                message: error.message
            })
        }
        if (error.message.includes("Unauthorized")) {
            return res.status(403).json({
                success: false,
                message: error.message
            })
        }
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        })
    }
}