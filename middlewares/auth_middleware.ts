import type { JwtPayload } from "jsonwebtoken";
import { query } from "../config/db";
import type { User } from "../types/User";
import { validateAccessToken } from "../utils/authentication_utils";
import { type NextFunction, type Request, type Response } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided" });
    }

    const decoded_payload: JwtPayload = validateAccessToken(token);

    if (!decoded_payload || !decoded_payload.exp) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid Token" });
    }

    if(decoded_payload.exp < Date.now()) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Your Token has expired!" });
    }

    const user: User = (
      await query("SELECT * FROM users WHERE id=$1", [decoded_payload.id])
    ).rows[0];

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("Error in auth middleware: ", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
