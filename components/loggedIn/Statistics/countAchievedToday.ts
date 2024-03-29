import { lightFormat } from "date-fns";
import { IUserData, useUser } from "../../../context/user-context";

export const countAchieved = (day: Date) => {
  const userData: IUserData | null = useUser();
  const checkmarks = userData?.checkmarks;
  const today = lightFormat(day, "d-M-yyy");

  return Object.entries(checkmarks).reduce((sum, curr) => {
    const [key, data] = curr;
    if (data.completed === true && data.date === today) sum++;
    return sum;
  }, 0);
};
