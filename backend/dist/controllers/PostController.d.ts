import { Request, Response } from "express";
interface AuthRequest extends Request {
    authorId?: number;
}
export declare const createPostHandler: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllPostsHandler: (_: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getPostByIdHandler: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updatePostHandler: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deletePostHandler: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export {};
