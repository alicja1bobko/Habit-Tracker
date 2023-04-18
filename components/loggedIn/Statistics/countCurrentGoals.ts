import { IUserData, useUser } from "../../../context/user-context";

export const countCurrentGoals = () => {
  const userData: IUserData | null = useUser();
  return Object.keys(userData.habits).length;
};
