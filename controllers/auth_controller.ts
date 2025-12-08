import { query } from "../config/db";
import { type Request, type Response } from "express";
import {
  createAccessToken,
  createRefreshToken,
} from "../utils/authentication_utils";
import { passwordChecker, passwordHasher } from "../utils/password_hashing";

interface ReqBody {
  email: string;
  password: string;
}

export async function signUp(req: Request, res: Response) {
  try {
    const { email, password }: ReqBody = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be greater than 8 characters",
      });
    }

    const existingUser = await query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (existingUser.rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await passwordHasher(password);

    const newUser = (
      await query(
        "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *",
        [email, hashedPassword]
      )
    ).rows[0];

    const accessToken = createAccessToken(newUser);
    const refreshToken = createRefreshToken(newUser);

    await query("UPDATE users SET refresh_token = $1 WHERE id = $2", [
      refreshToken,
      newUser.id,
    ]);

    res.status(201).json({
      success: true,
      user: { id: newUser.id, email: newUser.email, access_token: accessToken },
    });
  } catch (err) {
    console.log("An error occured while signing up: ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password }: ReqBody = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = (
      await query("SELECT id, email, password FROM users WHERE email=$1", [
        email,
      ])
    ).rows[0];

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordMatch = await passwordChecker(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    await query("UPDATE users SET refresh_token = $1 WHERE id = $2", [
      refreshToken,
      user.id,
    ]);

    res.status(201).json({
      success: true,
      user: { id: user.id, email: user.email, access_token: accessToken },
    });
  } catch (err) {
    console.log("An error occured while signing in: ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logOut = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const result = await query(
      "UPDATE users SET refresh_token = NULL WHERE id = $1",
      [userId]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};