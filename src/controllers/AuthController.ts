import { createUser } from "../services/AuthService";
import { Response, Request } from "express";

export const signup = async (req: Request, res: Response)=>{
    const {email, password, userName, name, avatarUrl} = req.body;

    if (!email || !password || !userName || !name, !avatarUrl){
        return res.json({
            success: false, 
            message: "All fields are required"
        })
    }
    const user = await createUser(email, password, userName, name, avatarUrl);
    res.json({
        success: true,
        message: "User created successfully",
        user
    });
}