import { asyncHandler } from "../../common/errors/asyncHandler.js";
import { loginUser } from "./auth.service.js";

export const authController = asyncHandler(async (req, res) => {
  const { email, password } = req.body ?? {};

  const result = await loginUser(email, password);
  if (!result) return res.status(401).json({ message: "Invalid credentials" });

  res.json(result);
});
