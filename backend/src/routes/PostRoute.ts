import {Router} from "express";
import { createPostHandler, getAllPostsHandler, getPostByIdHandler, updatePostHandler, deletePostHandler } from "../controllers/PostController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/posts",authMiddleware, createPostHandler);
router.get("/posts",getAllPostsHandler);
router.get("/posts/:postId",getPostByIdHandler);
router.put("/posts/:postId",authMiddleware, updatePostHandler);
router.delete("/posts/:postId",authMiddleware, deletePostHandler);

export default router;