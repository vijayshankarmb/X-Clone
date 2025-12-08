"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = require("../controllers/PostController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/posts", authMiddleware_1.default, PostController_1.createPostHandler);
router.get("/posts", PostController_1.getAllPostsHandler);
router.get("/posts/:postId", PostController_1.getPostByIdHandler);
router.put("/posts/:postId", authMiddleware_1.default, PostController_1.updatePostHandler);
router.delete("/posts/:postId", authMiddleware_1.default, PostController_1.deletePostHandler);
exports.default = router;
//# sourceMappingURL=PostRoute.js.map