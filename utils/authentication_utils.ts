import jwt, { type Secret, type JwtPayload } from "jsonwebtoken";

const secret: Secret = process.env.JWT_ACCESS_SECRET || "ddwdwqedqw";
const refreshSecret: Secret = process.env.JWT_REFRESH_SECRET || "dsadasdas";

export const createAccessToken = (user: any): string => {
  const payload: JwtPayload = { id: user.id, email: user.email };
  return jwt.sign(payload, secret, { expiresIn: "10s" });
};

export const createRefreshToken = (user: any): string => {
  const payload = { id: user.id, email: user.email };

  return jwt.sign(payload, refreshSecret, { expiresIn: "7d" });
};

export const validateAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const validateRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, refreshSecret) as JwtPayload;
};
