import { IUserData } from "../../../context/user-context";
import { normaliZeWeekdayFromDate } from "../../../utils/weekdays";

export const habitsForDay = (day: Date, habits: IUserData["habits"]) => {
  const habitsKeys = Object.keys(habits);
  const weekday = normaliZeWeekdayFromDate(day);

  let selectedDaysHabitKeys = habitsKeys.filter((habitKey) => {
    if (habits[habitKey].frequency.some((day: any) => day == weekday)) {
      return habitKey;
    }
  });

  return selectedDaysHabitKeys;
};
