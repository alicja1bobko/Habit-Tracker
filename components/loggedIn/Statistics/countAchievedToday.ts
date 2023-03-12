import { lightFormat } from "date-fns";
import { IUserData } from "../../../context/user-context";

export const countAchievedToday = (checkmarks: IUserData["checkmarks"]) => {
  const today = lightFormat(new Date(), "d-M-yyy");

  return Object.entries(checkmarks).reduce((sum, curr) => {
    const [key, data] = curr;
    if (data.completed === true && data.date === today) sum++;
    return sum;
  }, 0);
};
