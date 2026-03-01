import { asyncHandler } from "../../../common/errors/asyncHandler.js";
import { profileService } from "../profile.service.js";

export const getProfiles = asyncHandler(async (_req, res) => {
  const profiles = await profileService.getAllProfiles();
  res.status(200).json(profiles);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profile = await profileService.update(req.body);
  res.status(200).json(profile);
});
