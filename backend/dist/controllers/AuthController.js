"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getMe = exports.login = exports.signup = void 0;
const AuthService_1 = require("../services/AuthService");
const prisma_1 = require("../lib/prisma");
const signup = async (req, res) => {
    try {
        const { username, email, password, name, avatarUrl } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }
        const user = await (0, AuthService_1.createUser)({ username, email, password, name, avatarUrl });
        res.cookie("token", user.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        const { token, ...userWithoutToken } = user;
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: userWithoutToken
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Registration failed",
        });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }
        const user = await (0, AuthService_1.loginUser)({ email, password });
        res.cookie("token", user.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        const { token, ...userWithoutToken } = user;
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: userWithoutToken
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error.message || "Login failed"
        });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const userId = req.authorId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const user = await prisma_1.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                userName: true,
                name: true,
                avatarUrl: true
            }
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            user
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
exports.getMe = getMe;
const logout = async (_req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Logout failed"
        });
    }
};
exports.logout = logout;
//# sourceMappingURL=AuthController.js.map