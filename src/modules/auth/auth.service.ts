import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { env } from "../../configs/env.js";
import { UserModel } from "./user.model.js";

export function signAccessToken(payload: object) {
  return jwt.sign(payload, env.jwtAccessSecret, { expiresIn: "15m" });
}

export async function validatePassword(plain: string, hashed: string) {
  return bcrypt.compare(plain, hashed);
}

export async function loginUser(email: string, password: string) {
  const user = await UserModel.findOne({ email }).lean();
  if (!user) return null;

  const ok = await validatePassword(password ?? "", user.password);
  if (!ok) return null;

  const accessToken = signAccessToken({ email: user.email });
  return { accessToken };
}
