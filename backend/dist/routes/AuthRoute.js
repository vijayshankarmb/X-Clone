"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/signup", AuthController_1.signup);
router.post("/login", AuthController_1.login);
router.post("/logout", AuthController_1.logout);
router.get("/me", authMiddleware_1.default, AuthController_1.getMe);
exports.default = router;
//# sourceMappingURL=AuthRoute.js.map