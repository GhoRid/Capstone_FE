import { atom } from "recoil";

export const addressState = atom({
  key: "addressState",
  default: {
    departureAddress: "",
    arrivalAddress: "",
    startLat: null,
    startLng: null,
    endLat: null,
    endLng: null,
  },
});
