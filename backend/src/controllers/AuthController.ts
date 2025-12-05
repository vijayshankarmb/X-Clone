import { Request, Response } from "express";
import createUser from "../services/AuthService";

class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      const user = await createUser.register({ username, email, password });

      return res.status(201).json({
        message: "User registered successfully",
        user,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Registration failed",
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const token = await AuthService.login({ email, password });

      return res.status(200).json({
        message: "Login successful",
        token,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Login failed",
      });
    }
  }
}

export default AuthController;
