import { Router } from "express";
import { upload } from "../../../common/middleware/upload.js";
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project-private.controller.js";

export const projectPrivateRouter = Router();

projectPrivateRouter.get("/", getProjects);
projectPrivateRouter.get("/:slug", getProjectBySlug);
projectPrivateRouter.post("/", upload.single("coverImage"), createProject);
projectPrivateRouter.patch(
  "/:slug",
  upload.single("coverImage"),
  updateProject,
);
projectPrivateRouter.delete("/:slug", deleteProject);
