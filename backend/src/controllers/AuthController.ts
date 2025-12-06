import { Request, Response } from "express";
import {createUser, loginUser} from "../services/AuthService";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password, name, avatarUrl } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }
    const user = await createUser({ username, email, password, name, avatarUrl });

    res.cookie("token", user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    const {token, ...userWithoutToken} = user;

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userWithoutToken
    });

  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

export const login = async (req: Request, res: Response)=>{
    try{
      const {email, password} = req.body;

      if (!email || !password){
        return res.status(400).json({
          success: false,
          message: "Missing required fields"
        })
      }

      const user = await loginUser({email, password});

      res.cookie("token",user.token, 
        {httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7*24*60*60*1000
        });

        const {token, ...userWithoutToken} = user;
        
        return res.status(200).json({
        success: true,
        message: "Login successful",
        user: userWithoutToken
      })
    }
    catch(error: any){
      console.log(error);
      return res.status(400).json({
        success: false,
        message: error.message || "Login failed"
      })
    }
}; 


