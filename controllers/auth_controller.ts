import { query } from "../config/db";
import { type Request, type Response } from "express";
import {
  createAccessToken,
  createRefreshToken,
} from "../utils/authentication_utils";
import { passwordChecker, passwordHasher } from "../utils/password_hashing";
import type { ReqBody } from "../types/req_body";
import type { User, UserLogin } from "../types/User";

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

    const existingUser: User = (await query("SELECT * FROM users WHERE email = $1", [
      email,
    ])).rows[0];

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const hashedPassword: string = await passwordHasher(password);

    const newUser: User = (
      await query(
        "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *",
        [email, hashedPassword]
      )
    ).rows[0];

    const accessToken: string = createAccessToken(newUser);
    const refreshToken: string = createRefreshToken(newUser);

    await query("UPDATE users SET refresh_token = $1 WHERE id = $2", [
      refreshToken,
      newUser.id,
    ]);

    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        success: true,
        user: {
          id: newUser.id,
          email: newUser.email,
          access_token: accessToken,
        },
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

    const user: UserLogin = (
      await query("SELECT id, email, password FROM users WHERE email=$1", [
        email,
      ])
    ).rows[0];

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordMatch: boolean = await passwordChecker(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const accessToken: string = createAccessToken(user);
    const refreshToken: string = createRefreshToken(user);

    await query("UPDATE users SET refresh_token = $1 WHERE id = $2", [
      refreshToken,
      user.id,
    ]);

    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
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
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const result = await query(
      "UPDATE users SET refresh_token = NULL WHERE id = $1 RETURNING id",
      [userId]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.clearCookie("refresh_token");
    res.clearCookie("access_token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export async function authCheck(req: Request, res: Response) {
  try {
    console.log("req.user:", req.user);
    res.status(200).json({ success: true, user: req.user });
  } catch (err) {
    console.log("Error in authCheck controller", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
