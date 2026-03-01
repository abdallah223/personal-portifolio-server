import { asyncHandler } from "../../../common/errors/asyncHandler.js";
import { projectService } from "../project.service.js";

export const getProjects = asyncHandler(async (_req, res) => {
  const projects = await projectService.getAllProjects();
  res.status(200).json(projects);
});

export const getProjectBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params as { slug: string };
  const project = await projectService.getProjectBySlug(slug);
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.status(200).json(project);
});

export const createProject = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (req.file) body.coverImageUrl = `/uploads/${req.file.filename}`;
  const created = await projectService.createProject(body);
  res.status(201).json(created.toObject());
});

export const updateProject = asyncHandler(async (req, res) => {
  const { slug } = req.params as { slug: string };
  const newImagePath = req.file ? `/uploads/${req.file.filename}` : undefined;
  const project = await projectService.updateProject(
    slug,
    req.body,
    newImagePath,
  );
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.status(200).json(project);
});

export const deleteProject = asyncHandler(async (req, res) => {
  const { slug } = req.params as { slug: string };
  const deleted = await projectService.deleteProject(slug);
  if (!deleted) return res.status(404).json({ message: "Project not found" });
  res.status(200).json({ message: "Deleted", deleted });
});
