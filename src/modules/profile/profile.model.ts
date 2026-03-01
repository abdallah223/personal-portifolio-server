import mongoose from "mongoose";

export const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    headline: { type: String, required: true },
    about: { type: String, required: true },
    location: { type: String, required: true },
    socials: {
      github: String,
      linkedin: String,
      email: String,
      website: String,
    },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true },
);

export const ProfileModel = mongoose.model("Profile", ProfileSchema);
