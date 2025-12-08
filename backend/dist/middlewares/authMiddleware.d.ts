import { Request, Response, NextFunction } from "express";
interface AuthRequest extends Request {
    authorId?: number;
}
declare const authMiddleware: (req: AuthRequest, res: Response, next: NextFunction) => void;
export default authMiddleware;
