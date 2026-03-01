import { Router } from "express";
import {
  getPublishedProjects,
  getPublishedProjectBySlug,
} from "../controllers/project-public.controller.js";

export const projectPublicRouter = Router();

projectPublicRouter.get("/", getPublishedProjects);
projectPublicRouter.get("/:slug", getPublishedProjectBySlug);
