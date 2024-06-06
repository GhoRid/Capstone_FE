import { atom } from "recoil";

export const pathInfoState = atom({
  key: "pathInfoState",
  default: {
    suggestedDepartureTime: null,
    timeTakes: null,
    totalDistance: null,
    trafficCounts: null,
  },
});
