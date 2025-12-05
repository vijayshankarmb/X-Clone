import { Request, Response } from "express";
import createUser from "../services/AuthService";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password, name, avatarUrl } = req.body;

    const user = await createUser.createUser({ username, email, password, name, avatarUrl });

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Registration failed",
    });
  }
};
