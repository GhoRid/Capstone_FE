import { atom } from "recoil";

export const bottomSheetOpenState = atom({
  key: "bottomSheetOpenState",
  default: {
    detailInfoOpenState: { openState: "closed", id: null },
    surroundingLightInfoOpenState: "mid",
    favoritesInfoOpenState: "mid",
  },
});
