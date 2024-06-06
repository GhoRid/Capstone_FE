import { atom } from "recoil";

export const userInformationState = atom({
  key: "userInformationState",
  default: {
    id: 0,
    nickName: "",
    profileImage: "",
  },
});
