import { checkIfHabitCompleted } from "./checkIfHabitCompleted";
import { Day } from "./Day";
import { ISelectedRangeHabits } from "./ProgressCalendar";

export const Week = ({
  index,
  week,
  habitsKey,
  selectedRangeHabits,
}: {
  index: number;
  week: string[];
  habitsKey: string;
  selectedRangeHabits: ISelectedRangeHabits;
}) => {
  return (
    <div key={index} className="flex justify-between items-center ">
      {week.map((day, i, arr) => {
        let streak = false;
        if (i > 0) {
          let previousDay = arr[i - 1];
          streak = checkIfHabitCompleted(
            previousDay,
            habitsKey,
            selectedRangeHabits
          );
        }
        let isCompleted = checkIfHabitCompleted(
          day,
          habitsKey,
          selectedRangeHabits
        );
        return (
          <Day
            key={`${day} ${habitsKey}`}
            dayOfMonth={day}
            isCompleted={isCompleted}
            streak={streak}
          />
        );
      })}
    </div>
  );
};
