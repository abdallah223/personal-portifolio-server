import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    summary: { type: String, required: true, trim: true },

    problem: { type: String, trim: true, default: "" },
    solution: { type: String, trim: true, default: "" },

    impact: { type: [String], default: [] },
    stack: { type: [String], default: [] },

    links: {
      live: { type: String, trim: true, default: "" },
      repo: { type: String, trim: true, default: "" },
    },

    coverImageUrl: { type: String, trim: true, default: "" },

    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true, strict: "throw" },
);

export const ProjectModel = mongoose.model("Project", ProjectSchema);
