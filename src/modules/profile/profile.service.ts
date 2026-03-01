import { ProfileModel } from "./profile.model.js";

export const profileService = {
  // Private
  getAllProfiles() {
    return ProfileModel.find().lean();
  },

  update(data: object) {
    return ProfileModel.findOneAndUpdate({ status: "published" }, data, {
      new: true,
      runValidators: true,
    }).lean();
  },

  // Public
  getAllPublished() {
    return ProfileModel.find({ status: "published" }).lean();
  },
};
