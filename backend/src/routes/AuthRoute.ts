import { Router } from "express";
import { login, signup, getMe, logout } from "../controllers/AuthController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);

export default router;
