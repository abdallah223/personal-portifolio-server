import { Router } from "express";
import { getPublishedProfiles } from "../controllers/profile.public.controller.js";

export const profilePublicRouter = Router();

profilePublicRouter.get("/", getPublishedProfiles);
