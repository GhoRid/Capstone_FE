import { profileInstance } from "..";

export const updateProfileImage = (profile) => {
  return profileInstance.patch("", profile);
};
