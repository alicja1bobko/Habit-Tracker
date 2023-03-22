import { IUserData } from "../../../context/user-context";

export const countCurrentGoals = (habits: IUserData["habits"]) => {
  return Object.keys(habits).length;
};
