import { lightFormat } from "date-fns";
import { useEffect } from "react";
import { IUserData } from "../../../context/user-context";

export const countAchieved = (
  checkmarks: IUserData["checkmarks"],
  day: Date
) => {
  const today = lightFormat(day, "d-M-yyy");

  return Object.entries(checkmarks).reduce((sum, curr) => {
    const [key, data] = curr;
    if (data.completed === true && data.date === today) sum++;
    return sum;
  }, 0);
};
