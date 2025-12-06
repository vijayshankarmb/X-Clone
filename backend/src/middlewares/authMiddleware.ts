import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  userId?: number;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) throw new Error("JWT secret key missing");

    const decoded = jwt.verify(token, secretKey) as {userId: number};
    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
};

export default authMiddleware;
