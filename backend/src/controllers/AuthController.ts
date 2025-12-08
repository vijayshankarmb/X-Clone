import { Request, Response } from "express";
import { createUser, loginUser } from "../services/AuthService";
import { prisma } from "../lib/prisma";

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

    const { token, ...userWithoutToken } = user;

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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      })
    }

    const user = await loginUser({ email, password });

    res.cookie("token", user.token,
      {
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
    })
  }
  catch (error: any) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message || "Login failed"
    })
  }
};

export const getMe = async (req: Request | any, res: Response) => {
  try {
    const userId = req.authorId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const user = await prisma.user.findUnique({
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
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (_req: Request, res: Response) => {
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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Logout failed"
    });
  }
};
