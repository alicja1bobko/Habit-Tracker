import {
  lightFormat,
  eachDayOfInterval,
  getWeeksInMonth,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { IUserData } from "../../context/user-context";
import { chunks } from "../../utils/chunks";

interface ISelectedRangeHabits {
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

  // Transform db into object with dates as keys and habits as values
  const checkIfHabitCompleted = (day: string, habitsKey: string) => {
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
                  checkIfHabitCompleted={checkIfHabitCompleted}
                />
              );
            })}
          </>
        );
      })}
    </div>
  );
};

const Week = ({
  index,
  week,
  habitsKey,
  checkIfHabitCompleted,
}: {
  index: number;
  week: string[];
  habitsKey: string;
  checkIfHabitCompleted: (day: string, habitsKey: string) => boolean;
}) => {
  return (
    <div key={index} className="flex justify-between items-center ">
      {week.map((day, i, arr) => {
        let streak = false;
        if (i > 0) {
          let previousDay = arr[i - 1];
          streak = checkIfHabitCompleted(previousDay, habitsKey);
        }
        let isCompleted = checkIfHabitCompleted(day, habitsKey);
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

const Day = ({
  dayOfMonth,
  isCompleted,
  streak,
}: {
  dayOfMonth: string;
  isCompleted: boolean;
  streak: boolean;
}) => {
  return (
    <>
      <div
        className="flex-grow border-b border-2 first-of-type:hidden"
        style={{
          borderColor: streak && isCompleted ? "#318a31" : "transparent",
        }}
      ></div>
      <div
        className="rounded-full w-[30px] h-[30px] md:w-[40px] md:h-[40px] justify-center items-center flex text-xs md:text-base"
        style={{
          backgroundColor: isCompleted ? "#318a31" : "#fcfbf9",
          color: isCompleted ? "#ffffff" : "#d3c9b7",
        }}
      >
        {dayOfMonth.split("-")[0]}
      </div>
    </>
  );
};

export default ProgressCalendar;
