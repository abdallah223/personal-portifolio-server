import { asyncHandler } from "../../../common/errors/asyncHandler.js";
import { profileService } from "../profile.service.js";

export const getPublishedProfiles = asyncHandler(async (_req, res) => {
  const profiles = await profileService.getAllPublished();
  res.status(200).json(profiles);
});
