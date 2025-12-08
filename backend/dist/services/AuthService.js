"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const prisma_1 = require("../lib/prisma");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = async ({ username, email, password, name, avatarUrl }) => {
    const existingUser = await prisma_1.prisma.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const hashPassword = await bcryptjs_1.default.hash(password, 10);
    const user = await prisma_1.prisma.user.create({
        data: {
            email,
            password: hashPassword,
            userName: username,
            name,
            avatarUrl: avatarUrl || "https://api.dicebear.com/7.x/initials/svg?seed=" + username
        },
        select: {
            id: true,
            email: true,
            userName: true,
            name: true,
            avatarUrl: true
        }
    });
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        throw new Error("JWT secret key not found");
    }
    const token = jsonwebtoken_1.default.sign({ authorId: user.id }, secretKey, { expiresIn: "7d" });
    return {
        id: user.id,
        email: user.email,
        userName: user.userName,
        name: user.name,
        avatarUrl: user.avatarUrl,
        token
    };
};
exports.createUser = createUser;
const loginUser = async ({ email, password }) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: { email }
    });
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error("Invalid password");
    }
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
        throw new Error("JWT secret key not found");
    }
    const token = jsonwebtoken_1.default.sign({ authorId: user.id }, secretKey, { expiresIn: "7d" });
    return {
        id: user.id,
        email: user.email,
        userName: user.userName,
        name: user.name,
        avatarUrl: user.avatarUrl,
        token
    };
};
exports.loginUser = loginUser;
//# sourceMappingURL=AuthService.js.map