import {
  lightFormat,
  eachDayOfInterval,
  getWeeksInMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { IUserData } from "../../../context/user-context";
import { chunks } from "../../../utils/chunks";
import { Week } from "./Week";

export interface ISelectedRangeHabits {
  [key: string]: {
    [key: string]: boolean;
  };
}

const ProgressCalendar = ({
  habits,
  checkmarks,
  selectedHabitKey,
  selectDatesRange,
  weekView,
}: {
  habits: IUserData["habits"];
  checkmarks: IUserData["checkmarks"];
  weekView: boolean;
  selectedHabitKey: string;
  selectDatesRange: {
    start: Date;
    end: Date;
  };
}) => {
  let habitsKeys = Object.keys(habits);
  const checkmarkKeys = Object.keys(checkmarks);
  let selectedDates: string[] = [];
  let weeksSpanForMonthView: number = getWeeksInMonth(selectDatesRange.start, {
    weekStartsOn: 1,
  });
  let selectedRangeHabits: ISelectedRangeHabits;
  let selectedDatesChunks: string[][];

  const createSelectedRangeHabitsObject = () => {
    let selectedRangeHabits: ISelectedRangeHabits = {};
    selectedDates.map((day) => {
      checkmarkKeys.map((key) => {
        if (checkmarks[key].date == day) {
          let habitId = checkmarks[key].habitId;
          selectedRangeHabits[day] = {
            ...selectedRangeHabits[day],
            [`${habitId}`]: checkmarks[key].completed,
          };
        }
      });
    });
    return selectedRangeHabits;
  };

  // Get dates that are currently selected

  if (weekView) {
    selectedDates = eachDayOfInterval({
      start: selectDatesRange.start,
      end: selectDatesRange.end,
    }).map((date) => lightFormat(date, "d-M-yyy"));
    selectedRangeHabits = createSelectedRangeHabitsObject();
    selectedDatesChunks = chunks(selectedDates, 7);
  } else {
    let firstWeekStart = startOfWeek(selectDatesRange.start, {
      locale: { code: "en-gb" },
      weekStartsOn: 1,
    });
    let lastWeekEnd = endOfWeek(selectDatesRange.end, {
      locale: { code: "en-gb" },
      weekStartsOn: 1,
    });
    selectedDates = eachDayOfInterval({
      start: firstWeekStart,
      end: lastWeekEnd,
    }).map((date) => lightFormat(date, "d-M-yyy"));
    selectedRangeHabits = createSelectedRangeHabitsObject();
    selectedDatesChunks = chunks(selectedDates, 7);
    habitsKeys = [selectedHabitKey];
  }

  return (
    <div
      className={`grid grid-rows-${
        weekView ? habitsKeys.length : weeksSpanForMonthView
      } grid-cols-1 gap-y-4 3xl:gap-y-6`}
    >
      {habitsKeys.map((habitsKey) => {
        return (
          <>
            {selectedDatesChunks.map((week, i) => {
              return (
                <Week
                  key={i}
                  index={i}
                  week={week}
                  habitsKey={habitsKey}
                  selectedRangeHabits={selectedRangeHabits}
                />
              );
            })}
          </>
        );
      })}
    </div>
  );
};

export default ProgressCalendar;
