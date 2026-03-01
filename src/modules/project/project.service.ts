import fs from "fs";
import path from "path";
import { ProjectModel } from "./project.model.js";

export const projectService = {
  // Public
  getAllPublished() {
    return ProjectModel.find({ status: "published" }).lean();
  },

  getPublishedBySlug(slug: string) {
    return ProjectModel.findOne({ slug, status: "published" }).lean();
  },

  // Private
  getAllProjects() {
    return ProjectModel.find().lean();
  },

  getProjectBySlug(slug: string) {
    return ProjectModel.findOne({ slug }).lean();
  },

  createProject(data: object) {
    return ProjectModel.create(data);
  },

  async updateProject(slug: string, data: object, newImagePath?: string) {
    const body = { ...data } as Record<string, unknown>;

    if (newImagePath) {
      const existing = await ProjectModel.findOne({ slug }).lean();
      if (existing?.coverImageUrl) {
        fs.unlink(path.join("public", existing.coverImageUrl), () => {});
      }
      body.coverImageUrl = newImagePath;
    }

    return ProjectModel.findOneAndUpdate({ slug }, body, {
      new: true,
      runValidators: true,
    }).lean();
  },

  async deleteProject(slug: string) {
    const deleted = await ProjectModel.findOneAndDelete({ slug }).lean();
    if (deleted?.coverImageUrl) {
      fs.unlink(path.join("public", deleted.coverImageUrl), () => {});
    }
    return deleted;
  },
};
