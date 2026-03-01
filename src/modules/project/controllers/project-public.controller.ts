import { asyncHandler } from "../../../common/errors/asyncHandler.js";
import { projectService } from "../project.service.js";

export const getPublishedProjects = asyncHandler(async (_req, res) => {
  const projects = await projectService.getAllPublished();
  res.status(200).json(projects);
});

export const getPublishedProjectBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params as { slug: string };
  const project = await projectService.getPublishedBySlug(slug);
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.status(200).json(project);
});
