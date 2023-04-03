import { ISelectedRangeHabits } from "./ProgressCalendar";

// Transform db into object with dates as keys and habits as values
export const checkIfHabitCompleted = (
  day: string,
  habitsKey: string,
  selectedRangeHabits: ISelectedRangeHabits
) => {
  let isCompleted = false;
  if (selectedRangeHabits[day] !== undefined) {
    isCompleted =
      typeof Object.keys(selectedRangeHabits[day]).find(
        (key) => key == habitsKey
      ) !== undefined
        ? selectedRangeHabits[day][habitsKey]
        : false;
  }
  return isCompleted;
};
