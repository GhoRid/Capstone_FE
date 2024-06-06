import { memberInstance } from "..";

export const fetchMemebers = () => {
  return memberInstance.get();
};

export const addMember = (payload) => {
  console.log("payload", payload);
  return memberInstance.post("", payload);
};

export const deleteMember = () => {
  return memberInstance.delete();
};

export const addMemberRefresh = (payload) => {
  return memberInstance.post("/token", payload);
};
