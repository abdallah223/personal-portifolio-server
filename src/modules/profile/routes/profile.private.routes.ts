import { Router } from "express";
import {
  getProfiles,
  updateProfile,
} from "../controllers/profile.private.controller.js";

export const profilePrivateRouter = Router();

profilePrivateRouter.get("/", getProfiles);
profilePrivateRouter.patch("/", updateProfile);
